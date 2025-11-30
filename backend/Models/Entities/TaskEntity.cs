using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.Entities
{
    public class TaskEntity
    {

     // prop
        public int ID { get; set; }
        public string Title { get; set; }= string.Empty;

        public string  Description {get;set;}= string.Empty;

        public string Status { get; set;}= string.Empty;

        public int  Priority { get; set;}

        public DateTime Due_Date { get; set; }=DateTime.Now;

        public int Created_By_Id { get; set; }

        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }

        //one to many
        //taska-me assigments

// list e  typit task assaiments 
//kjo si e  lidh taskin me shum njerzz qe kena me i lidh
//kena me pas shum  usera ne task
        public List <TaskAssignments> TaskAssignments {get; set;}=new List<TaskAssignments> ();
    }
}