using SignalR.Project.Hackaton.DomainModel.Entities;
namespace SignalR.Project.Hackaton.DAL.Repository.Interface
{
    public interface IDashboardRepository
    {
        Task<List<Visit>> GetAll();
        void Create(Visit item);
    }
}
