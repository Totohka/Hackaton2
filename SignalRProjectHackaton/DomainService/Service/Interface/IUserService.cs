using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DomainService.Service.Interface
{
    public interface IUserService
    {
        public void CreateUser(UserViewModel user);
        public void UpdateUser(UserViewModel user);
        public Task<User> GetUser(string email);
    }
}