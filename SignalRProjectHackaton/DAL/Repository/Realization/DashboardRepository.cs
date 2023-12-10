using SignalR.Project.Hackaton.DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DAL.Repository.Realization
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly IDbContextFactory<UserContext> _contextFactory;
        public DashboardRepository(IDbContextFactory<UserContext> dbContextFactory)
        {
            _contextFactory = dbContextFactory;
        }
        public async Task<List<Visit>> GetAll()
        {
            using var db = _contextFactory.CreateDbContext();
            return await db.Set<Visit>().ToListAsync();
        }
        public async void Create(Visit item)
        {
            using var db = _contextFactory.CreateDbContext();
            await db.Set<Visit>().AddAsync(item);
            db.SaveChanges();
        }
    }
}