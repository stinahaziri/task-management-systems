using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using backend.Data;
using backend.Dtos.TaskEntity.Role;
using backend.Interface;
using backend.Migrations;
using backend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ClosedXML.Excel;

namespace backend.Controllers
{
    [Route("backend/Account")]
    public class AccountController : ControllerBase
    {
        readonly UserManager<AppUser> _userMenager;
         readonly ITokenService _tokenService;
         readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager,ITokenService tokenService,SignInManager<AppUser> signInManager)
        {
            _userMenager=userManager;
            _tokenService=tokenService;
            _signInManager=signInManager;
        }
//login
[HttpPost("login")]
public async Task<IActionResult> LogIn([FromBody] LoginDto loginDto)
        {
         if(!ModelState.IsValid)   
         return BadRequest(ModelState);

         var user = await _userMenager.Users.FirstOrDefaultAsync(x=> x.UserName == loginDto.Username.ToLower(System.Globalization.CultureInfo.CurrentCulture));

         if(user==null) return Unauthorized("Invalid haver");

         var result = await _signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);

         if(!result.Succeeded) return Unauthorized("Username not found or password");
          var roles = await _userMenager.GetRolesAsync(user); 
         return Ok(
            new
            {
                UserName=user.UserName,
                Email=user.Email,
                Token= await _tokenService.CreateToken(user),
                   Role = roles.FirstOrDefault() 
            }
         );
        }


[HttpGet("users")]
public async Task<IActionResult> GetAllUsers()
{
    var users = await _userMenager.Users
        .Select(x => new { x.Id, x.UserName }) 
        .ToListAsync();

    return Ok(users);
}
//register
        [HttpPost("register")]
        public async Task<IActionResult>Register([FromBody] RegisterDto rigesterDto)
        {
            try
            {
             if(!ModelState.IsValid)
             return BadRequest(ModelState);

              var appUser=new AppUser
              {
                  UserName=rigesterDto.Username,
                  Email=rigesterDto.Email,
              };

              var createUse=await _userMenager.CreateAsync(appUser,rigesterDto.Password);

                if (createUse.Succeeded)
                {
                    var roleResult=await _userMenager.AddToRoleAsync(appUser,"User");
                    if (roleResult.Succeeded)
                    {
                     
                    return Ok(new
                    {
                        
                            userName=appUser.UserName,
                            email=appUser.Email,
                            token = await _tokenService.CreateToken(appUser),
                            role = "User"
                    }
                        
                    );   
                    }
                    
                else
                {
                    return BadRequest(roleResult.Errors);
                }

                }
                
                else
                {
                   return BadRequest(createUse.Errors);
                }




            }catch(Exception e)
            {
                return StatusCode(500,e.Message);
                
            }
        }


        // ============================================================
        // FEATURE 1: USER SEARCH (Advanced Search - list 5: Users)
        // ============================================================
        [HttpGet("users/search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string? q, [FromQuery] string? sortBy = "username", [FromQuery] string? sortOrder = "asc")
        {
            var query = _userMenager.Users.AsQueryable();
            if (!string.IsNullOrWhiteSpace(q))
                query = query.Where(u => u.UserName!.Contains(q) || u.Email!.Contains(q));

            var users = query.Select(u => new { u.Id, u.UserName, u.Email });
            var list = sortOrder == "desc"
                ? await users.OrderByDescending(u => u.UserName).ToListAsync()
                : await users.OrderBy(u => u.UserName).ToListAsync();

            return Ok(new { total = list.Count, results = list });
        }

        // ============================================================
        // FEATURE 2: USER EXPORT
        // ============================================================
        [HttpGet("users/export/csv")]
        public async Task<IActionResult> ExportUsersCsv()
        {
            var users = await _userMenager.Users.Select(u => new { u.Id, u.UserName, u.Email }).ToListAsync();
            var sb = new StringBuilder();
            sb.AppendLine("ID,Username,Email");
            foreach (var u in users)
                sb.AppendLine($"{u.Id},\"{u.UserName}\",\"{u.Email}\"");
            return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", $"users_{DateTime.Now:yyyyMMdd}.csv");
        }

        [HttpGet("users/export/json")]
        public async Task<IActionResult> ExportUsersJson()
        {
            var users = await _userMenager.Users.Select(u => new { u.Id, u.UserName, u.Email }).ToListAsync();
            return Ok(users);
        }

        [HttpGet("users/export/excel")]
        public async Task<IActionResult> ExportUsersExcel()
        {
            var users = await _userMenager.Users.Select(u => new { u.Id, u.UserName, u.Email }).ToListAsync();
            using var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Users");
            ws.Cell(1, 1).Value = "ID"; ws.Cell(1, 2).Value = "Username"; ws.Cell(1, 3).Value = "Email";
            for (int c = 1; c <= 3; c++) { ws.Cell(1, c).Style.Font.Bold = true; ws.Cell(1, c).Style.Fill.BackgroundColor = XLColor.SteelBlue; ws.Cell(1, c).Style.Font.FontColor = XLColor.White; }
            for (int i = 0; i < users.Count; i++) { ws.Cell(i + 2, 1).Value = users[i].Id; ws.Cell(i + 2, 2).Value = users[i].UserName; ws.Cell(i + 2, 3).Value = users[i].Email; }
            ws.Columns().AdjustToContents();
            using var ms = new MemoryStream();
            wb.SaveAs(ms);
            return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"users_{DateTime.Now:yyyyMMdd}.xlsx");
        }
    }
}