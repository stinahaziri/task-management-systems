using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.TaskEntity
{
    public class TaskEntityDto
    {
         public int ID { get; set; }
          public string Title { get; set; }= string.Empty;
          
        public string  Description {get;set;}= string.Empty;
    
        public string Status { get; set;}= string.Empty;

        public int  Priority { get; set;}

        public int Progress { get; set; } = 0; 

        public DateTime Due_Date { get; set; }=DateTime.Now;

        public int Created_By_Id { get; set; }

        public DateTime Created_At { get; set; }=DateTime.Now;
        public DateTime Updated_At { get; set; }
        
        public List<AppUserDto>? AppUsers { get; set; }

    }
    
    public class AppUserDto
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
    }
}