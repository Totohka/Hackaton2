using SignalR.Project.Hackaton.DAL.Repository.Interface;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DomainService.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Project.Hackaton.DomainService.Service.Realization
{
    public class UserService : IUserService
    {
        private readonly IRepository<Message> _repositoryMessage;
        private readonly IUserRepository _repositoryUser;
        public UserService(IRepository<Message> repositoryMessage,
                           IUserRepository repositoryUser) {
            _repositoryMessage = repositoryMessage;
            _repositoryUser = repositoryUser;
        }

        public void CreateUser(UserViewModel user)
        {
            var userNew = new User()
            {
                Email = user.email,
                FirstName = user.first_name,
                LastName = user.last_name
            };
            _repositoryUser.Create(userNew);
        }

        public async Task<User> GetUser(string email)
        {
            var user = await _repositoryUser.GetByEmail(email);
            return user;
        }

        public async void UpdateUser(UserViewModel user)
        {
            var userOld = await _repositoryUser.GetByEmail(user.email);
            userOld.FirstName = user.first_name;
            userOld.LastName = user.last_name;
            _repositoryUser.Update(userOld);
        }
    }
}
