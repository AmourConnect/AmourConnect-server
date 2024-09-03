using AmourConnect.Infra.Extensions;
using AmourConnect.Infra.Interfaces;
using AmourConnect.API.Filters;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using AmourConnect.App.Extensions;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AmourConnect.Domain.Utils;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();

builder.Services.AddCaseControllers();

builder.Services.AddServicesControllers();

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

var key = Encoding.ASCII.GetBytes(Env.GetString("SecretKeyJWT"));

var tokenValidationParameter = new TokenValidationParameters()
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false, //for dev
    ValidateAudience = false, //for dev
    RequireExpirationTime = false, //needs refresh token to set up at TRUE (TODO)
    ValidateLifetime = true,
};

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    
.AddJwtBearer(jwt =>
{
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = tokenValidationParameter;
});

builder.Services.Configure<JwtSecret>(options =>
{
    options.Ip_Now_Frontend = Env.GetString("IP_NOW_FRONTEND");
    options.Ip_Now_Backend = Env.GetString("IP_NOW_BACKENDAPI");
    options.Key = Env.GetString("SecretKeyJWT");
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