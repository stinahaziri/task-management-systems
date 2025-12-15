using backend.Data;
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

//konfigurimi i dbContekstit

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{//qyty jon opsionet qfar databaze don me perdor
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    
});
var app = builder.Build();

//zbatimi i swegger
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection()

app.MapControllers();
app.Run();
