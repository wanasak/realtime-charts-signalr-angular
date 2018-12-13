using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RealTimeCharts_Server.Models;

namespace RealTimeCharts_Server.HubConfig
{
    public class ChartHub : Hub
    {
        // This BroadcastChartData method will receive the message from the client 
        // and then broadcast that same message to all the clients that listen 
        // on the bradcastchratdata event.
        public async Task BroadcastChartData(List<ChartModel> data) => await Clients.All.SendAsync("broadcastchartdata", data);
    }
}