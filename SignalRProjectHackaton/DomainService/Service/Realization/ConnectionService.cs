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
    public class ConnectionService : IConnectionService
    {
        private readonly IRepositoryConnection _repositoryConnection;
        public ConnectionService(IRepositoryConnection repositoryConnection)
        {
            _repositoryConnection = repositoryConnection;
        }

        public async Task<List<ConnectionChat>> GetAllConnections()
        {
            var connections = await _repositoryConnection.GetAll();
            return connections;
        }

        public void CreateConnection(string connectionId, string aesKey)
        {
            var connection = new ConnectionChat()
            {
                ConnectionId = connectionId,
                AESKey = aesKey
            };
            _repositoryConnection.Create(connection);
        }

        public void DeleteConnection(string connectionId)
        {
            _repositoryConnection.Delete(connectionId);
        }
    }
}
