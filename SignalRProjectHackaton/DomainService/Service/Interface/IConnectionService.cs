using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DomainService.Service.Interface
{
    public interface IConnectionService
    {
        public Task<List<ConnectionChat>> GetAllConnections();
        public void CreateConnection(string connectionId, string aesKey);
        public void DeleteConnection(string connectionId);
    }
}