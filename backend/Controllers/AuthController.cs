using backend.Data;
using backend.Models.Entities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Dtos.TaskEntity.Role;

namespace backend.Controllers
{
    [Route("backend/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context) { _context = context; }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Kontrollo nëse emaili ekziston
            if (await _context.User.AnyAsync(x => x.Email == dto.Email))
                return BadRequest("Ky Email është i zënë!");

            var user = new User {
                Username = dto.Username,
                Email = dto.Email,
                Password = dto.Password,
                Role = dto.Role
            };

            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Llogaria u krijua!" });
        }
        [HttpGet("users")]
public async Task<IActionResult> GetUsers() {
    return Ok(await _context.User.ToListAsync());
}

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.User
                .FirstOrDefaultAsync(x => x.Email == dto.Email && x.Password == dto.Password);

            if (user == null) return Unauthorized("Email ose Password gabim!");

            return Ok(new { 
                Username = user.Username, 
                Email = user.Email,
                Role = user.Role 
            });
        }
    }
}