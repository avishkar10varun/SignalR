import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BusinessService } from "./Service/business.service"
import { ChatNotification } from './Classes/ChatNotification';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OneTranzact';
  hubConnection: any;
  connectionId: any;
  chatNotifications: ChatNotification[] = [];

  constructor(private http: HttpClient, private BusinessService: BusinessService) {

  }
  ngOnInit(): void {
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiJhMDg4ZjA2NC1hZDcyLTQ4ZDItYWQwZS02YjEwMThjZmVkNzciLCJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MTA2MDAwODksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzEwOSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEwMCJ9.eQiNsFL1MUA1qmC9ixyuUzMPEWBPf1v41tyVLt7-mkE";

    const getAccessToken = () => {
      return "Bearer " + Token;
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://dev.userinteraction.witkenma.com/ConnectionHub', {
        withCredentials: true, // Enable sending credentials (cookies) with the request
        accessTokenFactory: getAccessToken // Provide a function to retrieve the access token
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.getConnectionId())
      .catch((err: string) => console.log('Error while starting connection: ' + err))

    this.hubConnection.on('AddUpdateGroupChat', (data: any) => {
      debugger
    })

    this.hubConnection.on('AddUpdateChat', (data: any) => {
      debugger
      this.chatNotifications.push(data);
    })
  }

  getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then((data: any) => {
      console.log(data);
      this.connectionId = data;
    });
  }
}



