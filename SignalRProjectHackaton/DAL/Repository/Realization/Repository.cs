using SignalR.Project.Hackaton.DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace SignalR.Project.Hackaton.DAL.Repository.Realization
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly IDbContextFactory<UserContext> _contextFactory;
        public Repository(IDbContextFactory<UserContext> dbContextFactory)
        {
            _contextFactory = dbContextFactory;
        }
        public async void Delete(int id)
        {
            using var db = _contextFactory.CreateDbContext();
            T item = await Get(id);
            db.Remove(item);
            db.SaveChanges();
        }
        public async Task<T> Get(int id)
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Set<T>().FindAsync(id);
        }
        public async Task<List<T>> GetAll()
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Set<T>().ToListAsync();
        }
        public void Create(T item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Set<T>().Add(item);
            db.SaveChanges();
        }

        public void Update(T item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Update(item);
            db.SaveChanges();
        }
    }
}