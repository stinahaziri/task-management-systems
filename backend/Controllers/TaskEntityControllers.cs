using backend.Data;
using backend.Mappers;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos.TaskEntity;
using Microsoft.EntityFrameworkCore;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;
using ClosedXML.Excel;
using System.Globalization;
using System.Text;

namespace backend.Controllers
{
    [Route("api/v1/tasks")]
    public class TaskEntityControllers : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITaskE _taskRepo;
        public TaskEntityControllers(ApplicationDbContext context, ITaskE taskRepo)
        {
            _taskRepo = taskRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetALL()
        {
            var TaskEntity = await _taskRepo.GetListAsync();
            return Ok(TaskEntity);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var TaskEntity = await _taskRepo.GetByIdAsync(id);
            if (TaskEntity == null) return NotFound();
            return Ok(TaskEntity.ToTaskEntityDto());
        }

        // ============================================================
        // FEATURE 1: ADVANCED SEARCH
        // ============================================================
        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery] string? q,
            [FromQuery] string? status,
            [FromQuery] int? priority,
            [FromQuery] int? minProgress,
            [FromQuery] int? maxProgress,
            [FromQuery] DateTime? fromDate,
            [FromQuery] DateTime? toDate,
            [FromQuery] string? sortBy = "created_at",
            [FromQuery] string? sortOrder = "desc",
            [FromQuery] string? list = "all")
        {
            var query = _context.TaskEntity.AsQueryable();

            // Full-text search across title and description
            if (!string.IsNullOrWhiteSpace(q))
                query = query.Where(t => t.Title.Contains(q) || t.Description.Contains(q));

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(t => t.Status == status);

            if (priority.HasValue)
                query = query.Where(t => t.Priority == priority.Value);

            if (minProgress.HasValue)
                query = query.Where(t => t.Progress >= minProgress.Value);

            if (maxProgress.HasValue)
                query = query.Where(t => t.Progress <= maxProgress.Value);

            if (fromDate.HasValue)
                query = query.Where(t => t.Due_Date >= fromDate.Value);

            if (toDate.HasValue)
                query = query.Where(t => t.Due_Date <= toDate.Value);

            // Filter by list type (the 5 lists)
            switch (list)
            {
                case "tasks":    query = query.Where(t => t.Progress >= 0 && t.Progress < 50); break;
                case "progress": query = query.Where(t => t.Progress >= 50 && t.Progress < 90); break;
                case "finished": query = query.Where(t => t.Progress == 100); break;
                case "expired":  query = query.Where(t => t.Due_Date < t.Created_At); break;
                // "all" = no filter
            }

            // Sorting
            query = (sortBy?.ToLower(), sortOrder?.ToLower()) switch
            {
                ("title", "asc")        => query.OrderBy(t => t.Title),
                ("title", "desc")       => query.OrderByDescending(t => t.Title),
                ("priority", "asc")     => query.OrderBy(t => t.Priority),
                ("priority", "desc")    => query.OrderByDescending(t => t.Priority),
                ("progress", "asc")     => query.OrderBy(t => t.Progress),
                ("progress", "desc")    => query.OrderByDescending(t => t.Progress),
                ("due_date", "asc")     => query.OrderBy(t => t.Due_Date),
                ("due_date", "desc")    => query.OrderByDescending(t => t.Due_Date),
                ("created_at", "asc")   => query.OrderBy(t => t.Created_At),
                _                       => query.OrderByDescending(t => t.Created_At),
            };

            var results = await query.ToListAsync();
            return Ok(new { total = results.Count, results });
        }

        // ============================================================
        // FEATURE 2: DATA EXPORT
        // ============================================================
        [HttpGet("export/json")]
        public async Task<IActionResult> ExportJson([FromQuery] string? list = "all")
        {
            var tasks = await GetFilteredTasks(list);
            return Ok(tasks);
        }

        [HttpGet("export/csv")]
        public async Task<IActionResult> ExportCsv([FromQuery] string? list = "all")
        {
            var tasks = await GetFilteredTasks(list);

            var sb = new StringBuilder();
            sb.AppendLine("ID,Title,Description,Status,Priority,Progress,Due_Date,Created_At");
            foreach (var t in tasks)
            {
                sb.AppendLine($"{t.ID},\"{t.Title.Replace("\"","\"\"")}\",\"{t.Description.Replace("\"","\"\"")}\",{t.Status},{t.Priority},{t.Progress},{t.Due_Date:yyyy-MM-dd},{t.Created_At:yyyy-MM-dd}");
            }

            var bytes = Encoding.UTF8.GetBytes(sb.ToString());
            return File(bytes, "text/csv", $"tasks_{list}_{DateTime.Now:yyyyMMdd}.csv");
        }

        [HttpGet("export/excel")]
        public async Task<IActionResult> ExportExcel([FromQuery] string? list = "all")
        {
            var tasks = await GetFilteredTasks(list);

            using var workbook = new XLWorkbook();
            var ws = workbook.Worksheets.Add("Tasks");

            // Header
            var headers = new[] { "ID", "Title", "Description", "Status", "Priority", "Progress", "Due Date", "Created At" };
            for (int i = 0; i < headers.Length; i++)
            {
                ws.Cell(1, i + 1).Value = headers[i];
                ws.Cell(1, i + 1).Style.Font.Bold = true;
                ws.Cell(1, i + 1).Style.Fill.BackgroundColor = XLColor.SteelBlue;
                ws.Cell(1, i + 1).Style.Font.FontColor = XLColor.White;
            }

            // Data
            for (int row = 0; row < tasks.Count; row++)
            {
                var t = tasks[row];
                ws.Cell(row + 2, 1).Value = t.ID;
                ws.Cell(row + 2, 2).Value = t.Title;
                ws.Cell(row + 2, 3).Value = t.Description;
                ws.Cell(row + 2, 4).Value = t.Status;
                ws.Cell(row + 2, 5).Value = t.Priority;
                ws.Cell(row + 2, 6).Value = t.Progress;
                ws.Cell(row + 2, 7).Value = t.Due_Date.ToString("yyyy-MM-dd");
                ws.Cell(row + 2, 8).Value = t.Created_At.ToString("yyyy-MM-dd");
            }

            ws.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            stream.Position = 0;
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"tasks_{list}_{DateTime.Now:yyyyMMdd}.xlsx");
        }

        // ============================================================
        // FEATURE 2: DATA IMPORT
        // ============================================================
        [HttpPost("import/json")]
        public async Task<IActionResult> ImportJson([FromBody] List<CreateTaskRequestDto> dtos)
        {
            if (dtos == null || dtos.Count == 0) return BadRequest("Nuk ka të dhëna.");
            int imported = 0;
            foreach (var dto in dtos)
            {
                var model = dto.ToTaskEntityDTO();
                await _context.TaskEntity.AddAsync(model);
                imported++;
            }
            await _context.SaveChangesAsync();
            return Ok(new { imported, message = $"{imported} tasks u importuan me sukses." });
        }

        [HttpPost("import/csv")]
        public async Task<IActionResult> ImportCsv(IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("Nuk ka skedar.");
            int imported = 0;
            int skipped = 0;

            using var reader = new StreamReader(file.OpenReadStream());
            string? header = await reader.ReadLineAsync(); // skip header

            while (!reader.EndOfStream)
            {
                var line = await reader.ReadLineAsync();
                if (string.IsNullOrWhiteSpace(line)) continue;

                var cols = ParseCsvLine(line);
                if (cols.Length < 7) { skipped++; continue; }

                try
                {
                    var task = new backend.Models.Entities.TaskEntity
                    {
                        Title = cols[1],
                        Description = cols[2],
                        Status = cols[3],
                        Priority = int.TryParse(cols[4], out var p) ? p : 1,
                        Progress = int.TryParse(cols[5], out var prog) ? prog : 0,
                        Due_Date = DateTime.TryParse(cols[6], out var d) ? d : DateTime.Now,
                        Created_At = DateTime.Now,
                        Updated_At = DateTime.Now
                    };
                    await _context.TaskEntity.AddAsync(task);
                    imported++;
                }
                catch { skipped++; }
            }

            await _context.SaveChangesAsync();
            return Ok(new { imported, skipped, message = $"{imported} tasks u importuan, {skipped} u kaluan." });
        }

        // ============================================================
        // FEATURE 3: DYNAMIC REPORT GENERATION
        // ============================================================
        [HttpGet("reports")]
        public async Task<IActionResult> GenerateReport(
            [FromQuery] string groupBy = "status",
            [FromQuery] DateTime? fromDate = null,
            [FromQuery] DateTime? toDate = null)
        {
            var query = _context.TaskEntity.AsQueryable();

            if (fromDate.HasValue) query = query.Where(t => t.Created_At >= fromDate.Value);
            if (toDate.HasValue)   query = query.Where(t => t.Created_At <= toDate.Value);

            var tasks = await query.ToListAsync();

            object report = groupBy.ToLower() switch
            {
                "status" => tasks
                    .GroupBy(t => string.IsNullOrEmpty(t.Status) ? "N/A" : t.Status)
                    .Select(g => new { label = g.Key, count = g.Count(), avgProgress = g.Average(t => t.Progress) })
                    .ToList(),

                "priority" => tasks
                    .GroupBy(t => t.Priority)
                    .OrderBy(g => g.Key)
                    .Select(g => new { label = $"Priority {g.Key}", count = g.Count(), avgProgress = g.Average(t => t.Progress) })
                    .ToList(),

                "progress" => new object[]
                {
                    new { label = "Tasks (0-49%)",    count = tasks.Count(t => t.Progress < 50),                     avgProgress = tasks.Where(t => t.Progress < 50).DefaultIfEmpty().Average(t => t?.Progress ?? 0) },
                    new { label = "In Progress (50-89%)", count = tasks.Count(t => t.Progress >= 50 && t.Progress < 90), avgProgress = tasks.Where(t => t.Progress >= 50 && t.Progress < 90).DefaultIfEmpty().Average(t => t?.Progress ?? 0) },
                    new { label = "Finished (100%)",  count = tasks.Count(t => t.Progress == 100),                   avgProgress = 100.0 },
                    new { label = "Expired",          count = tasks.Count(t => t.Due_Date < t.Created_At),           avgProgress = tasks.Where(t => t.Due_Date < t.Created_At).DefaultIfEmpty().Average(t => t?.Progress ?? 0) }
                },

                "month" => tasks
                    .GroupBy(t => new { t.Created_At.Year, t.Created_At.Month })
                    .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                    .Select(g => new { label = $"{g.Key.Year}-{g.Key.Month:D2}", count = g.Count(), avgProgress = g.Average(t => t.Progress) })
                    .ToList(),

                _ => tasks.GroupBy(t => t.Status)
                    .Select(g => new { label = g.Key, count = g.Count(), avgProgress = g.Average(t => t.Progress) })
                    .ToList()
            };

            var summary = new
            {
                totalTasks = tasks.Count,
                avgProgress = tasks.Count > 0 ? tasks.Average(t => t.Progress) : 0,
                completedTasks = tasks.Count(t => t.Progress == 100),
                overdueTasks = tasks.Count(t => t.Due_Date < DateTime.Now && t.Progress < 100),
                fromDate,
                toDate,
                groupBy,
                data = report
            };

            return Ok(summary);
        }

        [HttpGet("reports/export/excel")]
        public async Task<IActionResult> ExportReportExcel(
            [FromQuery] string groupBy = "status",
            [FromQuery] DateTime? fromDate = null,
            [FromQuery] DateTime? toDate = null)
        {
            var query = _context.TaskEntity.AsQueryable();
            if (fromDate.HasValue) query = query.Where(t => t.Created_At >= fromDate.Value);
            if (toDate.HasValue)   query = query.Where(t => t.Created_At <= toDate.Value);
            var tasks = await query.ToListAsync();

            using var workbook = new XLWorkbook();
            var ws = workbook.Worksheets.Add("Report");

            ws.Cell(1, 1).Value = $"Task Management Report - GroupBy: {groupBy}";
            ws.Cell(1, 1).Style.Font.Bold = true;
            ws.Cell(2, 1).Value = $"Generated: {DateTime.Now:yyyy-MM-dd HH:mm}";
            ws.Cell(3, 1).Value = $"Period: {fromDate?.ToString("yyyy-MM-dd") ?? "All"} - {toDate?.ToString("yyyy-MM-dd") ?? "All"}";

            ws.Cell(5, 1).Value = "Category";
            ws.Cell(5, 2).Value = "Count";
            ws.Cell(5, 3).Value = "Avg Progress (%)";
            for (int c = 1; c <= 3; c++)
            {
                ws.Cell(5, c).Style.Font.Bold = true;
                ws.Cell(5, c).Style.Fill.BackgroundColor = XLColor.SteelBlue;
                ws.Cell(5, c).Style.Font.FontColor = XLColor.White;
            }

            var grouped = groupBy.ToLower() switch
            {
                "priority" => tasks.GroupBy(t => $"Priority {t.Priority}").Select(g => new { Label = g.Key, Count = g.Count(), Avg = g.Average(t => t.Progress) }).ToList(),
                "month"    => tasks.GroupBy(t => $"{t.Created_At.Year}-{t.Created_At.Month:D2}").OrderBy(g => g.Key).Select(g => new { Label = g.Key, Count = g.Count(), Avg = g.Average(t => t.Progress) }).ToList(),
                _          => tasks.GroupBy(t => string.IsNullOrEmpty(t.Status) ? "N/A" : t.Status).Select(g => new { Label = g.Key, Count = g.Count(), Avg = g.Average(t => t.Progress) }).ToList()
            };

            for (int i = 0; i < grouped.Count; i++)
            {
                ws.Cell(6 + i, 1).Value = grouped[i].Label;
                ws.Cell(6 + i, 2).Value = grouped[i].Count;
                ws.Cell(6 + i, 3).Value = Math.Round(grouped[i].Avg, 1);
            }

            ws.Columns().AdjustToContents();
            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"report_{groupBy}_{DateTime.Now:yyyyMMdd}.xlsx");
        }

        // CRUD existing
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskRequestDto taskEntityDto)
        {
            var TaskEntityModel = taskEntityDto.ToTaskEntityDTO();
            await _taskRepo.CreateAsync(TaskEntityModel);
            return CreatedAtAction(nameof(GetById), new { id = TaskEntityModel.ID }, TaskEntityModel.ToTaskEntityDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UptadeTaskRequestDto updateDto)
        {
            var taskModel = await _taskRepo.UpdateAsync(id, updateDto);
            if (taskModel == null) return NotFound();
            return Ok(taskModel.ToTaskEntityDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _taskRepo.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return NoContent();
        }

        // ============================================================
        // HELPERS
        // ============================================================
        private async Task<List<backend.Models.Entities.TaskEntity>> GetFilteredTasks(string? list)
        {
            var query = _context.TaskEntity.AsQueryable();
            query = list switch
            {
                "tasks"    => query.Where(t => t.Progress >= 0 && t.Progress < 50),
                "progress" => query.Where(t => t.Progress >= 50 && t.Progress < 90),
                "finished" => query.Where(t => t.Progress == 100),
                "expired"  => query.Where(t => t.Due_Date < t.Created_At),
                _          => query
            };
            return await query.ToListAsync();
        }

        private static string[] ParseCsvLine(string line)
        {
            var result = new List<string>();
            bool inQuotes = false;
            var current = new StringBuilder();
            foreach (char c in line)
            {
                if (c == '"') { inQuotes = !inQuotes; }
                else if (c == ',' && !inQuotes) { result.Add(current.ToString()); current.Clear(); }
                else { current.Append(c); }
            }
            result.Add(current.ToString());
            return result.ToArray();
        }
    }
}
