using System.Security.Cryptography;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var keySize = 2048;
var rsaCryptoServiceProvider = new RSACryptoServiceProvider(keySize);

var connections = new Dictionary<string, string>() //<ConnectionId, AES key>
{
    //типо бд с подключениями
};

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
