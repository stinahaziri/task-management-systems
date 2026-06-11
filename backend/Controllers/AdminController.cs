using backend.Data;
using backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("backend/Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public AdminController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // POST /backend/Admin/AssignUserTask
        [HttpPost("AssignUserTask")]
        public async Task<IActionResult> AssignUserTask([FromBody] AssignTaskDto dto)
        {
            if (string.IsNullOrEmpty(dto.UserId) || dto.TaskId <= 0)
                return BadRequest("UserId dhe TaskId janë të detyrueshme.");

            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null) return NotFound("Përdoruesi nuk u gjet.");

            var task = await _context.TaskEntity.FindAsync(dto.TaskId);
            if (task == null) return NotFound("Task-u nuk u gjet.");

            // Kontroll: mos e cakto dy herë
            var exists = await _context.TaskAssignments
                .AnyAsync(a => a.Task_Id == dto.TaskId && a.User_Id == dto.UserId);

            if (exists)
                return BadRequest("Ky përdorues e ka të caktuar tashmë këtë task.");

            var assignment = new TaskAssignments
            {
                Task_Id = dto.TaskId,
                User_Id = dto.UserId,
                Assigned_At = DateTime.Now,
                Assigned_By = 1
            };

            await _context.TaskAssignments.AddAsync(assignment);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Task '{task.Title}' u caktua te '{user.UserName}' me sukses.",
                assignment = new
                {
                    assignment.Id,
                    TaskTitle = task.Title,
                    UserName = user.UserName,
                    assignment.Assigned_At
                }
            });
        }

        // DELETE /backend/Admin/RemoveAssignment/{assignmentId}
        [HttpDelete("RemoveAssignment/{assignmentId}")]
        public async Task<IActionResult> RemoveAssignment(int assignmentId)
        {
            var assignment = await _context.TaskAssignments.FindAsync(assignmentId);
            if (assignment == null) return NotFound();

            _context.TaskAssignments.Remove(assignment);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET /backend/Admin/TaskAssignments - shfaq të gjitha caktimet
        [HttpGet("TaskAssignments")]
        public async Task<IActionResult> GetAllAssignments()
        {
            var assignments = await _context.TaskAssignments
                .Include(a => a.TaskEntity)
                .Include(a => a.AppUser)
                .Select(a => new
                {
                    a.Id,
                    TaskId = a.Task_Id,
                    TaskTitle = a.TaskEntity != null ? a.TaskEntity.Title : "N/A",
                    UserId = a.User_Id,
                    UserName = a.AppUser != null ? a.AppUser.UserName : "N/A",
                    a.Assigned_At
                })
                .ToListAsync();

            return Ok(assignments);
        }

        // GET /backend/Admin/UserTasks/{userId}
        [HttpGet("UserTasks/{userId}")]
        public async Task<IActionResult> GetUserTasks(string userId)
        {
            var assignments = await _context.TaskAssignments
                .Where(a => a.User_Id == userId)
                .Include(a => a.TaskEntity)
                .Select(a => new
                {
                    a.Id,
                    a.Task_Id,
                    TaskTitle = a.TaskEntity != null ? a.TaskEntity.Title : "N/A",
                    TaskProgress = a.TaskEntity != null ? a.TaskEntity.Progress : 0,
                    TaskStatus = a.TaskEntity != null ? a.TaskEntity.Status : "N/A",
                    a.Assigned_At
                })
                .ToListAsync();

            return Ok(assignments);
        }
    }

    public class AssignTaskDto
    {
        public string UserId { get; set; } = string.Empty;
        public int TaskId { get; set; }
    }
}
