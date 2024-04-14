using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Interfaces;
using server_api.Models;
using server_api.Repository;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();




// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var connect = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApiDbContext>(options =>
options.UseNpgsql(connect));



var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApiDbContext>();
        var seedData = new SeedData();
        seedData.SeedApiDbContext(context);
    }
}


// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();