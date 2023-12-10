using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalR.Project.Hackaton.DomainModel.Entities;
using SignalR.Project.Hackaton.DomainService.Service.Interface;
using SignalR.Project.Hackaton.DomainServices.Interface;

namespace SignalR.Project.Hackaton.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly IConnectionService _connectionService;

        public DashboardController(IDashboardService dashboardService,
                                   IConnectionService connectionService)
        {
            _dashboardService = dashboardService;
            _connectionService = connectionService;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            object result = new
            {
                day = await _dashboardService.GetCountVisitingToDay(),
                month = await _dashboardService.GetCountVisitingToMounth(),
            };
            return result;
        }
    }

    public class VisitViewModel
    {
        public DateTime date { get; set; }
    }
}
