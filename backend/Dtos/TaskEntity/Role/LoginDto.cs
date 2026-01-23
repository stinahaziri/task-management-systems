using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.TaskEntity.Role
{
    public class LoginDto
    {
         
    [Required]
    public string Username { get; set; } = string.Empty; 
    public string Password { get; set; }=string.Empty; 
    }
}