using SignalR.Project.Hackaton.DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DAL.Repository.Realization
{
    public class RepositoryMessage : IRepository<Message>
    {
        private readonly IDbContextFactory<UserContext> _contextFactory;
        public RepositoryMessage(IDbContextFactory<UserContext> dbContextFactory)
        {
            _contextFactory = dbContextFactory;
        }
        public async void Delete(int id)
        {
            using var db = _contextFactory.CreateDbContext();
            Message item = await Get(id);
            db.Remove(item);
            db.SaveChanges();
        }
        public async Task<Message> Get(int id)
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Set<Message>().FindAsync(id);
        }
        public async Task<List<Message>> GetAll()
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Messages.Include(m => m.User).ToListAsync();
        }
        public void Create(Message item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Set<Message>().Add(item);
            db.SaveChanges();
        }

        public void Update(Message item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Update(item);
            db.SaveChanges();
        }
    }
}