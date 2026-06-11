using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    public class TaskAssignments
    {
        public int Id { get; set; }

        public int Task_Id { get; set; }
        public string User_Id { get; set; } = string.Empty;

        public DateTime Assigned_At { get; set; } = DateTime.Now;
        public int Assigned_By { get; set; }

        [ForeignKey("Task_Id")]
        public TaskEntity? TaskEntity { get; set; }

        [ForeignKey("User_Id")]
        public AppUser? AppUser { get; set; }
    }
}
