[ApiController]
[Route("api/users")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // ✅ ADMIN – GET ALL USERS
    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await _context.Users.ToListAsync());
    }

    // ✅ ADMIN – CREATE USER
    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> CreateUser(ApplicationUser user)
    {
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456");
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }

    // ✅ ADMIN – UPDATE USER
    [HttpPut("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> UpdateUser(int id, ApplicationUser dto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        user.FullName = dto.FullName;
        user.Email = dto.Email;
        user.Role = dto.Role;

        await _context.SaveChangesAsync();
        return Ok(user);
    }

    // ✅ ADMIN – DELETE USER
    [HttpDelete("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // 🔄 USER & ADMIN – UPDATE OWN PROFILE
    [HttpPut("profile/me")]
    public async Task<IActionResult> UpdateMyProfile(ApplicationUser dto)
    {
        var userId = int.Parse(User.FindFirst("id").Value);
        var user = await _context.Users.FindAsync(userId);

        user.FullName = dto.FullName;
        user.Email = dto.Email;

        await _context.SaveChangesAsync();
        return Ok(user);
    }
}
