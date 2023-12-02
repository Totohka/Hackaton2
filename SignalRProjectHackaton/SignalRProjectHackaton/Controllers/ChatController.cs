using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace SignalRProjectHackaton.Controllers
{
    [ApiController]
    [Route("api/message")]
    public class MessageController : Controller
    {
        protected readonly IHubContext<SignalrHub> _messageHub;

        public MessageController([NotNull] IHubContext<SignalrHub> messageHub)
        {
            _messageHub = messageHub;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MessagePost messagePost)
        {
            
            //rsa.Publ
            await _messageHub.Clients.All.SendAsync("sendToReact", messagePost.username + ": " + messagePost.message);
            
            return Ok();
        }
    }

    public class MessagePost
    {
        public virtual string message { get; set; }
        public virtual string username { get; set; }

    }


   
}