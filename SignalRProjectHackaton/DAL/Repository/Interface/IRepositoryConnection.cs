using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DAL.Repository.Interface
{
    public interface IRepositoryConnection
    {
        Task<ConnectionChat> Get(string connectionId);
        Task<List<ConnectionChat>> GetAll();
        void Create(ConnectionChat item);
        void Update(ConnectionChat item);
        void Delete(string connectionId);
    }
}
