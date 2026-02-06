
using backend.Data;
using backend.Mappers;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos.TaskEntity;
using Microsoft.EntityFrameworkCore;
using backend.Interface;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controllers 
{
    [Route("api/v1/tasks")] //rruga e Api si url psh //versionimi

    // [ApiController]//per mu sjell si Api
   
    public class TaskEntityControllers : ControllerBase//  me u sjell si kontroll me dit
    {
        private readonly ApplicationDbContext _context;//veq e bon mutable nuk i lejon njerzit me modifiku diqka qe sbon 
        private readonly ITaskE _taskRepo;
        public TaskEntityControllers(ApplicationDbContext context , ITaskE  taskRepo)//konstruktori/ qyty e shtina databazen
        {
            _taskRepo=taskRepo;
            _context = context;

        }

        //get-i tash
        //get krejt me i marr
        
        [HttpGet]
        public async Task<IActionResult> GetALL()//na kthen requestin si metod cila o 200 ,404 e qisi sene
        {
            var TaskEntity = await _taskRepo.GetListAsync(); //e nxjerrum prej databaze / _context.TaskEntity.ToListAsync()
            
            var TaskEntityDto=TaskEntity.Select(s => s.ToTaskEntityDto()) ;
            // .Select(s => s.ToTaskEntityDto());
            return Ok(TaskEntity);
        }

        //get me e marr veq 1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            //e kom thirr ma nalt Itasken me taskRepo
            var TaskEntity = await _taskRepo.GetByIdAsync(id);

            if (TaskEntity == null)
            {

                return NotFound();
            }
            return Ok(TaskEntity.ToTaskEntityDto());
        }


        //post

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskRequestDto taskEntityDto)
        {
            var TaskEntityModel = taskEntityDto.ToTaskEntityDTO();
            await _taskRepo.CreateAsync(TaskEntityModel);
            return CreatedAtAction(nameof(GetById), new { id = TaskEntityModel.ID }, TaskEntityModel.ToTaskEntityDto());
        }

        //[put]

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UptadeTaskRequestDto updateDto)
        {
            //me lyp id per me editu
            var taskModel = await _taskRepo.UpdateAsync(id ,updateDto);
            if (taskModel == null)
            {
                return NotFound();
            }
          
            return Ok(taskModel.ToTaskEntityDto());


        }

        // [HttpDelete]
        // [Route("{id}")]

        // public async Task<IActionResult> Delete([FromRoute] int id)
        // {
        //     var taskModal = await _taskRepo.DeleteAsync(id);
        //     if (taskModal == null)
        //     {
        //         return NotFound();
        //     }
           
        //     return NoContent();
        // }

        [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")] //  RBAC
    public async Task<IActionResult> Delete(int id) 
    {
        var deleted = await _taskRepo.DeleteAsync(id);
        if (deleted == null) return NotFound();
        return NoContent();
    }



    }
}