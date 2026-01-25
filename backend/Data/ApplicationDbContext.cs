using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;


using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>  //DbContext
    {
        //konstruktori

        public ApplicationDbContext(DbContextOptions dbContextOptions )
        :base(dbContextOptions)
        {
            
        }


        public DbSet<TaskEntity>TaskEntity{get; set;}

        public DbSet<TaskAssignments>TaskAssignments{get; set;}

        public DbSet<User>User{get; set;}

        //rolet

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name="Admin",
                    NormalizedName ="ADMIN"
                },
                new IdentityRole
                {
                    Name="User",
                    NormalizedName ="User"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
            
            // Configure TaskAssignments -> AppUser relationship
            builder.Entity<TaskAssignments>()
                .HasOne(ta => ta.AppUser)
                .WithMany()
                .HasForeignKey(ta => ta.User_Id)
                .OnDelete(DeleteBehavior.Restrict);
        }

        
    }
}