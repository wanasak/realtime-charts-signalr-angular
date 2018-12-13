import { Injectable } from '@angular/core';
import { ChartModel } from '../_interfaces/chartdata.model';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  public bradcastedData: ChartModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', data => {
      this.data = data;
      console.log(data);
    });
  }

  // This function will listen on the braodcastchartdata event
  public broadcastChartData = () => {
    this.hubConnection
      .invoke('broadcastchartdata', this.data)
      .catch(err => console.error(err));
  }

  // This function will send data to our Hub endpoint
  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', data => {
      this.bradcastedData = data;
    });
  }
}
