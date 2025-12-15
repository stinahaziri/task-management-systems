
using backend.Data;
using backend.Mappers;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos.TaskEntity;


namespace backend.Controllers
{
    [Route("backend/TaskEntity")]//rruga e Api si url psh
    [ApiController]//per mu sjell si Api
    public class TaskEntityControllers : ControllerBase//  me u sjell si kontroll me dit
    {
        private readonly ApplicationDbContext _context;//veq e bon mutable nuk i lejon njerzit me modifiku diqka qe sbon 
        public TaskEntityControllers(ApplicationDbContext context)//konstruktori/ qyty e shtina databazen
        {
            _context=context;

        }

        //get-i tash
        //get krejt me i marr
        [HttpGet]
        public IActionResult GetALL()//na kthen requestin si metod cila o 200 ,404 e qisi sene
        {
            var TaskEntity=_context.TaskEntity.ToList()//e nxjerrum prej databaze
            .Select(s=>s.ToTaskEntityDto());
            return Ok(TaskEntity);
        }
        //get me e marr veq 1
        [HttpGet("{Id}")]
        public IActionResult GetById([FromRoute] int Id)
        {
            var TaskEntity=_context.TaskEntity.Find(Id);

            if(TaskEntity == null){

                return NotFound();
            }
            return Ok(TaskEntity.ToTaskEntityDto());
        }


        //post

        [HttpPost]
        public IActionResult Create([FromBody] CreateTaskRequestDto taskEntityDto)
        {
            var TaskEntityModel = taskEntityDto.ToTaskEntityDTO();
            _context.TaskEntity.Add(TaskEntityModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = TaskEntityModel.ID }, TaskEntityModel.ToTaskEntityDto());
        }

    }
}