using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Interfaces;
using server_api.Repository;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using server_api.Filters;


Env.Load();
Env.TraversePath().Load();



var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<AuthorizeUserConnect>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "web_site_Front", configurePolicy: policyBuilder =>
    {
        policyBuilder.WithOrigins(Env.GetString("IP_NOW_FRONTEND"));
        policyBuilder.WithHeaders("Content-Type");
        policyBuilder.WithMethods("GET", "POST");
        policyBuilder.AllowCredentials();
    });
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<ApiDbContext>(options =>
options.UseNpgsql(Env.GetString("ConnectionDB")));



// Auth Google
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(options =>
{
    options.ClientId = Env.GetString("ClientId");
    options.ClientSecret = Env.GetString("ClientSecret");
});



var app = builder.Build();



// Migration
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<ApiDbContext>();
    dataContext.Database.Migrate();
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    using (var scope = app.Services.CreateScope()) // SeedData User random
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApiDbContext>();
        var seedData = new SeedData();
        seedData.SeedApiDbContext(context);
    }
}



// app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors("web_site_Front");

app.Run();