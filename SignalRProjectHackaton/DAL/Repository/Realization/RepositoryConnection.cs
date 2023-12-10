using SignalR.Project.Hackaton.DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DAL.Repository.Realization
{
    public class RepositoryConnection : IRepositoryConnection
    {
        private readonly IDbContextFactory<UserContext> _contextFactory;
        public RepositoryConnection(IDbContextFactory<UserContext> dbContextFactory)
        {
            _contextFactory = dbContextFactory;
        }
        public async void Delete(string connectionId)
        {
            using var db = _contextFactory.CreateDbContext();
            ConnectionChat item = await Get(connectionId);
            if (item != null)
            {
                db.Remove(item);
                db.SaveChanges();
            }
        }
        public async Task<ConnectionChat> Get(string connectionId)
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Set<ConnectionChat>().FirstOrDefaultAsync(c => c.ConnectionId == connectionId);
        }
        public async Task<List<ConnectionChat>> GetAll()
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Connections.ToListAsync();
        }
        public void Create(ConnectionChat item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Set<ConnectionChat>().Add(item);
            db.SaveChanges();
        }

        public void Update(ConnectionChat item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Update(item);
            db.SaveChanges();
        }
    }
}