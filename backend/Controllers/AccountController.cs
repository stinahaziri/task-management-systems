using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.TaskEntity.Role;
using backend.Interface;
using backend.Migrations;
using backend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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

      
    }
}