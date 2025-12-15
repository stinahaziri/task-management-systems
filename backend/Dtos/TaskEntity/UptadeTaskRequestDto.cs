using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.TaskEntity
{
    public class UptadeTaskRequestDto
    {
         public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Priority { get; set; }
        public DateTime Due_Date { get; set; } = DateTime.Now;
        public int Created_By_Id { get; set; }
    }
}