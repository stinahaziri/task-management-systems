using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.TaskEntity;
using backend.Models.Entities;

namespace backend.Interface
{
    public interface ITaskE
    {
        // Task<IEnumerable<object>> GetAllAsync();
        //task-tregon se kjo metod esht asinkrone //kthen nje list me taskentity

        Task<List<TaskEntity>>GetListAsync();//GetAll
        Task<TaskEntity?>GetByIdAsync(int id);//Get by Id//        
        Task<TaskEntity>CreateAsync(TaskEntity TaskModel); //create
        Task<TaskEntity?>UpdateAsync(int id,UptadeTaskRequestDto taskDto);
        
        Task<TaskEntity?>DeleteAsync(int id );



    }
}