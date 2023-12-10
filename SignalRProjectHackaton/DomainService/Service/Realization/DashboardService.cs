using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DAL.Repository.Interface;
using SignalR.Project.Hackaton.DomainServices.Interface;

namespace SignalR.Project.Hackaton.DomainService.Service.Realization
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _repositoryDashboard;
        public DashboardService(IDashboardRepository repositoryDashboard)
        {
            _repositoryDashboard = repositoryDashboard;
        }

        public void CreateNewVisit(Visit visit)
        {
            _repositoryDashboard.Create(visit);
        }

        public async Task<DashboardData[]> GetCountVisitingToDay()
        {
            var visits = await _repositoryDashboard.GetAll();
            var visitsToDay = visits.Where(v => v.Date.Year == DateTime.Now.Year &&
                                           v.Date.Month == DateTime.Now.Month && 
                                           v.Date.Day == DateTime.Now.Day).ToList();
            DashboardData[] arrToVisitstoHours = new DashboardData[24];
            for (var i = 0; i < arrToVisitstoHours.Length; i++)
            {
                arrToVisitstoHours[i] = new DashboardData() { name = $"{i}" };
            }
            foreach (var v in visitsToDay)
            {
                arrToVisitstoHours[v.Date.Hour].value += 1;
            }
            return arrToVisitstoHours;
        }
        public async Task<DashboardData[]> GetCountVisitingToMounth()
        {
            var visits = await _repositoryDashboard.GetAll();
            var visitsToMonth = visits.Where(v => v.Date.Year == DateTime.Now.Year && 
                                                v.Date.Month == DateTime.Now.Month).ToList();
            DashboardData[] arrToVisitstoDay = new DashboardData[31];
            for (var i = 0; i < arrToVisitstoDay.Length; i++)
            {
                arrToVisitstoDay[i] = new DashboardData() { name = $"{i + 1}"};
            }
            foreach (var v in visitsToMonth)
            {
                arrToVisitstoDay[v.Date.Day - 1].value += 1;
            }
            return arrToVisitstoDay;
        }
    }
}