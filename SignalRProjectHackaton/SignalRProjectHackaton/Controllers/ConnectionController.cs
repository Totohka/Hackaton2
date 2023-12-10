using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalR.Project.Hackaton.DomainService.Service.Interface;

namespace SignalR.Project.Hackaton.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ConnectionController : ControllerBase
    {
        private readonly IConnectionService _connectionService;
        public ConnectionController(IConnectionService connectionService)
        {
            _connectionService = connectionService;
        }

        [HttpPost]
        public void CreateConnection(ConnectionViewModel connectionViewModel)
        {
            _connectionService.CreateConnection(connectionViewModel.connectionId, connectionViewModel.aesKey);
        }

        [HttpDelete]
        public void DeleteConnection(string connectionId)
        {
            _connectionService.DeleteConnection(connectionId);
        }

        [HttpGet]
        public async Task<object> GetCountConnections()
        {
            var connections = await _connectionService.GetAllConnections();
            var obj = new { count = connections.Count() };
            return obj;
        }

        [HttpGet("All")]
        public async Task<object> GetConnections() {
            var connections = await _connectionService.GetAllConnections();
            var connectionsId = new List<string>();
            foreach (var connection in connections)
            {
                connectionsId.Add(connection.ConnectionId);
            }
            object result = new
            {
                connections = connectionsId
            };
            return result;
        }
    }

    

    public class ConnectionViewModel
    {
        public string connectionId { get; set; }
        public string aesKey { get; set; }
    }
}
