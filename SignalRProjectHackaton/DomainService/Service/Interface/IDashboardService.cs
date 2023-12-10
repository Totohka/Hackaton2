using SignalR.Project.Hackaton.DomainModel.Entities;

namespace SignalR.Project.Hackaton.DomainServices.Interface
{
    public interface IDashboardService
    {
        void CreateNewVisit(Visit visit);
        Task<DashboardData[]> GetCountVisitingToDay();
        Task<DashboardData[]> GetCountVisitingToMounth();
    }
}