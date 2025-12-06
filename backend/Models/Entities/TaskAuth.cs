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
        
        public string FirstName { get; set; }= string.Empty;
        
        public string LastName { get; set; }= string.Empty;

        public string Email { get; set; }= string.Empty;

        public string  Password {get;set;}= string.Empty;
        
        public int?  Phone {get;set;}

        public int  Role{ get; set;}//duhet me ndrru mavon qita se sesht type i njejt 

        public DateTime Created_At { get; set; }

        public DateTime Updated_At { get; set; }
    }
}