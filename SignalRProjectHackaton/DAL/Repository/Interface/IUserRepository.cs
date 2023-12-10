using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DAL.Repository.Interface
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByEmail(string email);
    }
}
