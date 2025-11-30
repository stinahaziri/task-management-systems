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
        public int User_Id { get; set; }

        public DateTime Assigned_At { get; set; }=DateTime.Now;
        public int Assigned_By { get; set; }

        // Navigation properties
        public TaskEntity? TaskEntity { get; set; }
        // public UserEntity User { get; set; }
    


    }
}