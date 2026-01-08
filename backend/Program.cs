using backend.Data;
using backend.Interface;
using backend.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();
//swegger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

//konfigurimi i dbContekstit

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{//qyty jon opsionet qfar databaze don me perdor
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    
});
builder.Services.AddScoped<ITaskE,TaskRepositor>();//ura lidhse me interfacin edhe klasen e cila e implementon ata
var app = builder.Build();

//zbatimi i swegger
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS before MapControllers
app.UseCors("AllowReact");

// app.UseHttpsRedirection()

app.MapControllers();
app.Run();
