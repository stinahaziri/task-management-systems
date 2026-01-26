using backend.Data;
using backend.Interface;
using backend.Models.Entities;
using backend.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using backend.Service;

var builder = WebApplication.CreateBuilder(args);

var port = 5165;
builder.WebHost.UseUrls($"http://localhost:{port}");

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


builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit=true;
    options.Password.RequireLowercase=true; 
    options.Password.RequireUppercase=true;
    options.Password.RequireNonAlphanumeric=true;
    options.Password.RequiredLength=8;
    options.Password.RequiredUniqueChars=1;
 options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+ "; 
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();;
// #pragma warning disable CS8604 // Possible null reference argument.

//per hyrje,dalje ,indentifikim me perdor JWT ,kerkon nje token
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme=
    options.DefaultChallengeScheme=
    options.DefaultScheme=
    options.DefaultSignInScheme=
    options.DefaultSignOutScheme=JwtBearerDefaults.AuthenticationScheme;

})//ketu i jep roje kriteret me e dallu token fallc me originalin
.AddJwtBearer(options=>
options.TokenValidationParameters=new TokenValidationParameters
{
 ValidateIssuer=true,//serveri kontrollons e kush ka leshu token 
 ValidIssuer=builder.Configuration["JWT:Issuer"],//prano tokenat e leshuar nga ky eemr
 ValidateAudience=true,
 ValidAudience=builder.Configuration["JWT:Audience"],
 IssuerSigningKey = new SymmetricSecurityKey(
    System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
 )

});
// #pragma warning restore CS8604 // Possible null reference argument.

builder.Services.AddScoped<ITaskE,TaskRepositor>();//ura lidhse me interfacin edhe klasen e cila e implementon ata
builder.Services.AddScoped<ITokenService, TokenService>();
var app = builder.Build();



using (var scope = app.Services.CreateScope())
{

    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

    // 1. Krijo rolet nëse nuk ekzistojnë
    string[] roleNames = { "Admin", "User" };
    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }

    
    var adminEmail = "admin@test.com";
    var adminUser = await userManager.FindByEmailAsync(adminEmail);

    if (adminUser == null)
    {
        var newAdmin = new AppUser { 
            UserName = "admin", 
            Email = adminEmail,
            
        };
        
        var createAdmin = await userManager.CreateAsync(newAdmin, "Admin123!");
        if (createAdmin.Succeeded)
        {
            await userManager.AddToRoleAsync(newAdmin, "Admin");
        }
    }
}

// ... vazhdon kodi tjetër
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
app.UseAuthentication();
app.UseAuthentication();
// app.UseHttpsRedirection()

app.MapControllers();
app.Run();
