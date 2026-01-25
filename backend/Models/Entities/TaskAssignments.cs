using System;
using System.Collections.Generic;

namespace backend.Models.Entities
{
    public class TaskAssignments
    {
        public int Id { get; set; }

        public int Task_Id { get; set; }
        public string User_Id { get; set; } 

        public DateTime Assigned_At { get; set; } = DateTime.Now;
        public int Assigned_By { get; set; }

      
        public TaskEntity? TaskEntity { get; set; }
        
        
        public AppUser? AppUser { get; set; } 
    }
}