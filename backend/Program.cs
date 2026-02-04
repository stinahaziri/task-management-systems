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

using System.IdentityModel.Tokens.Jwt;
using Microsoft.OpenApi.Models;
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
var builder = WebApplication.CreateBuilder(args);

var port = 5165;
builder.WebHost.UseUrls($"http://localhost:{port}");

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Versionimi dhe Kontrolluesit
builder.Services.AddControllers();


//swegger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Task Management API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Ju lutem jepni Token-in: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference { Type=ReferenceType.SecurityScheme, Id="Bearer" }
            },
            new string[]{}
        }
    });
});

//Caching
builder.Services.AddMemoryCache();

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


//  Identity & Roles
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
 ),
   RoleClaimType = "role", 
        NameClaimType = "given_name",
        ClockSkew = TimeSpan.Zero

});
// #pragma warning restore CS8604 // Possible null reference argument.

//di services
builder.Services.AddScoped<ITaskE,TaskRepositor>();//ura lidhse me interfacin edhe klasen e cila e implementon ata
builder.Services.AddScoped<ITokenService, TokenService>();
var app = builder.Build();


//  Seeding Roles (Admin/User)
using (var scope = app.Services.CreateScope())
{

    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

    // 1. krijo rolet nese nuk egziston 
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


app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task API v1");
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// CORS
app.UseCors("AllowReact");


// app.UseHttpsRedirection(); 


app.UseAuthentication();

app.UseAuthorization(); 

app.MapControllers();

app.Run();











