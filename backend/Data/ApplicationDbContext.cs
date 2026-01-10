using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        //kinstruktori
        public ApplicationDbContext(DbContextOptions dbContextOptions )
        :base(dbContextOptions)
        {
            
        }


        public DbSet<TaskEntity>TaskEntity{get; set;}

        public DbSet<TaskAssignments>TaskAssignments{get; set;}

        public DbSet<User>User{get; set;}
        
    }
}