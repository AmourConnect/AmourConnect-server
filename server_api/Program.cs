using Microsoft.EntityFrameworkCore;
using server_api.Data;
using server_api.Interfaces;
using server_api.Repository;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using server_api.Filters;
using server_api.Hubs;

Env.Load();
Env.TraversePath().Load();



var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMessage, MessageRepository>();
builder.Services.AddScoped<IRequestFriends, RequestFriendsRepository>();
builder.Services.AddScoped<AuthorizeUserConnectAsync>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "web_site_Front", configurePolicy: policyBuilder =>
    {
        policyBuilder.WithOrigins(Env.GetString("IP_NOW_FRONTEND"));
        policyBuilder.WithHeaders("Content-Type");
        policyBuilder.WithMethods("GET", "POST", "PATCH");
        policyBuilder.AllowCredentials();
    });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<ApiDbContext>(options =>
options.UseNpgsql(Env.GetString("ConnectionDB")));



// OAuth Google
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



if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapHub<MessageHub>("/messagehub");

app.MapControllers();

app.UseCors("web_site_Front");

await app.RunAsync();