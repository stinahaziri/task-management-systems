using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.TaskEntity;
using backend.Interface;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;


//Krejt kto jon per data te dhana  per mos me ronu shum kontrollerin
namespace backend.Repository
{
    public class TaskRepositor : ITaskE 
    {
        private readonly ApplicationDbContext _context;
        public TaskRepositor(ApplicationDbContext context)
        {
            _context= context;
        
        }

        public async Task<TaskEntity> CreateAsync(TaskEntity TaskModel)
        {
            await _context.TaskEntity.AddAsync(TaskModel);
            await _context.SaveChangesAsync();
            return TaskModel;
        }

        public async Task<TaskEntity?> DeleteAsync(int id)
        {//fetch our model
        var TaskModel=await _context.TaskEntity.FirstOrDefaultAsync(x=>x.ID==id);
            if (TaskModel== null)
            {
                return null;
            }
            _context.TaskEntity.Remove(TaskModel);
            await _context.SaveChangesAsync();
            return TaskModel;
        }

        public async Task<TaskEntity?> GetByIdAsync(int id)
        {
            // var TaskModel=await _context.TaskEntity.FirstOrDefaultAsync(x=>x.ID==ID);
            // if(TaskModel == null)
            // {
            //     return null;
            // }
            // return TaskModel;
            return await _context.TaskEntity.FindAsync(id);
        }

        public async Task<List<TaskEntity>>GetListAsync()
        {
            return await _context.TaskEntity.ToListAsync();
        }

        public async Task<TaskEntity?> UpdateAsync(int id, UptadeTaskRequestDto taskDto)
        {
            var existingTask= await _context.TaskEntity.FirstOrDefaultAsync(x=> x.ID == id);

            if (existingTask == null)
            {
                return null;
            }


            existingTask.Title=taskDto.Title;
            existingTask.Title=taskDto.Title;
            existingTask.Description=taskDto.Description;
            existingTask.Status=taskDto.Status;
            existingTask.Priority=taskDto.Priority;
            existingTask.Due_Date=taskDto.Due_Date;
            existingTask.Progress=taskDto.Progress;
            
            existingTask.Created_By_Id=taskDto.Created_By_Id;
            
            await _context.SaveChangesAsync();
            return existingTask;
        }
    }
}