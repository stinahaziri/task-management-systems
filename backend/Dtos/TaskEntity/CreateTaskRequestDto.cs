using System;

namespace backend.Dtos.TaskEntity
{
    public class CreateTaskRequestDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Priority { get; set; }
        public int Progress{ get ; set;  }
        
        public DateTime Due_Date { get; set; } = DateTime.Now;
        public int Created_By_Id { get; set; }
    }
}