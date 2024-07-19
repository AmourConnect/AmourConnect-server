using AmourConnect.Infra.Extensions;
using AmourConnect.Infra.Interfaces;
using AmourConnect.API.Filters;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using AmourConnect.App.Extensions;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();

builder.Services.AddCaseControllers();

builder.Services.AddInfrastructure();

builder.Services.AddScoped<AuthorizeUser>();

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
    options.Events = new Microsoft.AspNetCore.Authentication.OAuth.OAuthEvents
    {
        OnRemoteFailure = context =>
        {
            context.Response.Redirect(Env.GetString("IP_NOW_FRONTEND") + "/login");
            context.HandleResponse();
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<IAmourConnectDbContext>();
    dataContext.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    using (var scope = app.Services.CreateScope())
    {
        var seeder = scope.ServiceProvider.GetRequiredService<IUserSeeder>();
        await seeder.Seed();
    }
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors("web_site_Front");

await app.RunAsync();