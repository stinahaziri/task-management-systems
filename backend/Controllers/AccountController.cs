using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.TaskEntity.Role;
using backend.Interface;
using backend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("backend/Account")]
    public class AccountController : ControllerBase
    {
        readonly UserManager<AppUser> _userMenager;
         readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,ITokenService tokenService)
        {
            _userMenager=userManager;
            _tokenService=tokenService;
        }

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
                        
                            UserName=appUser.UserName,
                            Email=appUser.Email,
                            Token = _tokenService.CreateToken(appUser)
                    }
                        
                    );   
                    }
                    
                else
                {
                    return StatusCode(500,roleResult.Errors);
                }

                }
                
                else
                {
                    return StatusCode(500,createUse.Errors);
                }




            }catch(Exception e)
            {
                return StatusCode(500,e.Message);
                
            }
        }

        private IActionResult Ok(object value1, object value2, object value3)
        {
            throw new NotImplementedException();
        }
    }
}