using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DomainService.Service.Interface;

namespace SignalR.Project.Hackaton.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) { 
            _userService = userService;
        }
        [HttpPost]
        public IActionResult CreateUser(UserViewModel user)
        {
            _userService.CreateUser(user);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateUser(UserViewModel user)
        {
            _userService.UpdateUser(user);
            return Ok();
        }

        [HttpGet]
        public async Task<User> GetUser(string email)
        {
            var user = await _userService.GetUser(email);
            return user;
        }
    }

}
