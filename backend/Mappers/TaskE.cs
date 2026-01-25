using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.TaskEntity;
using backend.Models.Entities;

namespace backend.Mappers
{
    public static class TaskE
    {
        public static TaskEntityDto ToTaskEntityDto(this TaskEntity TaskEntityModel)
        {
            return new TaskEntityDto
            {
                ID=TaskEntityModel.ID,
                Title=TaskEntityModel.Title,
                Status=TaskEntityModel.Status,
                Description=TaskEntityModel.Description,
                Priority=TaskEntityModel.Priority,
                Due_Date=TaskEntityModel.Due_Date,
                Created_By_Id=TaskEntityModel.Created_By_Id,
                Progress=TaskEntityModel.Progress,
                Created_At=TaskEntityModel.Created_At,
                Updated_At=TaskEntityModel.Updated_At,
            };
        }

     public static TaskEntity ToTaskEntityDTO(this CreateTaskRequestDto dto)
{
    return new TaskEntity
    {
        Title = dto.Title,
        Status = dto.Status,
        Priority = dto.Priority,
        Description = dto.Description,
        Due_Date = dto.Due_Date,
        Progress = dto.Progress,
        Created_By_Id = dto.Created_By_Id,
        Created_At = DateTime.UtcNow,
        Updated_At = DateTime.UtcNow,

        
       
    };
}
    }
}