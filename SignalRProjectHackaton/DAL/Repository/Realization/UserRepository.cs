using SignalR.Project.Hackaton.DAL.Repository.Interface;
using SignalR.Project.Hackaton.DAL;
using SignalR.Project.Hackaton.DomainModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace SignalR.Project.Hackaton.Network.DAL.Repository.Realization
{

    public class UserRepository : IUserRepository
    {
        private readonly IDbContextFactory<UserContext> _contextFactory;
        public UserRepository(IDbContextFactory<UserContext> dbContextFactory)
        {
            _contextFactory = dbContextFactory;
        }

        public async Task<User> GetByEmail(string email)
        {
            using var db = _contextFactory.CreateDbContext();
            var user = await db.Users.FirstOrDefaultAsync(p => p.Email == email); ;
            return user;
        }

        public async Task<User> Get(int id)
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Users.FindAsync(id);
        }

        public async Task<List<User>> GetAll()
        {
            using var db = _contextFactory.CreateDbContext();
            var users = await db.Users.ToListAsync();
            return users;
        }

        public void Create(User item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Users.Add(item);
            db.SaveChanges();
        }

        public void Update(User item)
        {
            using var db = _contextFactory.CreateDbContext();
            db.Update(item);
            db.SaveChanges();
        }

        public async void Delete(int id)
        {
            using var db = _contextFactory.CreateDbContext();
            User item = await Get(id);
            db.Remove(item);
            db.SaveChanges();
        }
    }
}