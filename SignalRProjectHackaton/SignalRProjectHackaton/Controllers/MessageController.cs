using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DomainService.Service.Interface;

namespace SignalR.Project.Hackaton.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        private readonly IHubContext<SignalrHub> _messageHub;
        private readonly IChatService _chatService;
        private readonly IUserService _userService;
        private readonly IConnectionService _connectionService;

        public MessageController([NotNull] IHubContext<SignalrHub> messageHub,
                                           IChatService chatService,
                                           IConnectionService connectionService,
                                           IUserService userService)
        {
            _messageHub = messageHub;
            _chatService = chatService;
            _connectionService = connectionService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MessagePost messagePost)
        {
            var connections = await _connectionService.GetAllConnections();
            var con = connections.Where(c => c.ConnectionId == messagePost.connectionId).FirstOrDefault();
            string msg = _chatService.Decrypt(messagePost.message, con.AESKey);
            _chatService.SaveMsg(msg, messagePost.username);
            var user = await _userService.GetUser(messagePost.username);
            for (int i = 0; i < connections.Count(); i++)
            {
                string msgEncrypt = _chatService.Encrypt(msg, connections[i].AESKey);                
                await _messageHub.Clients.Client(connections[i].ConnectionId).SendAsync("sendToReact", user.FirstName + ' ' + user.LastName, msgEncrypt); 
            }
            return Ok();
        }

        [HttpGet]
        public async Task<List<Message>> GetAll()
        {
            var msgs = await _chatService.GetAllMsg();
            return msgs;
        } 
    }

    public class MessagePost
    {
        public virtual string message { get; set; }
        public virtual string username { get; set; }
        public virtual string connectionId { get; set;}
    }


   
}