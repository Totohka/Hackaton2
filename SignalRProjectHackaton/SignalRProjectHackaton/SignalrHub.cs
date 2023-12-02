using Microsoft.AspNetCore.SignalR;
using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;

public class SignalrHub : Hub
{
    //protected readonly RSACryptoServiceProvider _rsaCryptoServiceProvider;
    //public SignalrHub([NotNull] RSACryptoServiceProvider rsaCryptoServiceProvider)
    //{
    //    _rsaCryptoServiceProvider = rsaCryptoServiceProvider;
    //}
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} вошел в чат");
        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} покинул в чат");
        await base.OnDisconnectedAsync(exception);
    }
}