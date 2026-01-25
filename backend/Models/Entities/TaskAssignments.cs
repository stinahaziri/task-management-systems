using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.Entities
{
    public class TaskAssignments
    {
        
  public int Id { get; set; }

        public int Task_Id { get; set; }
        public string User_Id { get; set; } = string.Empty; // Changed to string to match AppUser.Id

        public DateTime Assigned_At { get; set; }=DateTime.Now;
        public string Assigned_By { get; set; } = string.Empty; // Changed to string to match AppUser.Id

        // Navigation properties
        public TaskEntity? TaskEntity { get; set; }
        public AppUser? AppUser { get; set; }
    


    }
}