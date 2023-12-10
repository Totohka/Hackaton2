using SignalR.Project.Hackaton.DAL.Repository.Interface;
using SignalR.Project.Hackaton.DAL;
using SignalR.Project.Hackaton.Network.DAL.Repository.Realization;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DAL.Repository.Realization;
using SignalR.Project.Hackaton.DomainService.Service.Realization;
using SignalR.Project.Hackaton.DomainService.Service.Interface;
using Microsoft.EntityFrameworkCore;
using SignalR.Project.Hackaton.DomainServices.Interface;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

// Add services to the container.
builder.Services.AddDbContext<UserContext>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("UserConnection")).EnableSensitiveDataLogging(), optionsLifetime: ServiceLifetime.Singleton);
builder.Services.AddDbContextFactory<UserContext>();

builder.Services.AddControllers();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IConnectionService, ConnectionService>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<IRepositoryConnection, RepositoryConnection>();
builder.Services.AddScoped<IRepository<Message>, RepositoryMessage>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // Read Dealing with CORS from blog post https://www.abrahamberg.com/blog/aspnet-signalr-and-react/
    app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true) // allow any origin
        .AllowCredentials()); // allow credentials
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<SignalrHub>("/hub");

app.Run();
