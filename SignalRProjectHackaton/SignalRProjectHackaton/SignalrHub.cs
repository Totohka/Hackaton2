using Microsoft.AspNetCore.SignalR;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DomainService.Service.Interface;
using SignalR.Project.Hackaton.DomainServices.Interface;

public class SignalrHub : Hub
{
    private readonly IConnectionService _connectionService;
    private readonly IDashboardService _dashboardService;
    public SignalrHub(IConnectionService connectionService,
                      IDashboardService dashboardService)
    {
        _connectionService = connectionService;
        _dashboardService = dashboardService;
    }
    public override async Task OnConnectedAsync()
    {
        _dashboardService.CreateNewVisit(new Visit() { Date = DateTime.Now });
        await Clients.Caller.SendAsync("ConnectedHub");
        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (Context.ConnectionId != null)
        {
            _connectionService.DeleteConnection(Context.ConnectionId);
        }
        await Clients.Caller.SendAsync("Notify");
        await base.OnDisconnectedAsync(exception);
    }
}
