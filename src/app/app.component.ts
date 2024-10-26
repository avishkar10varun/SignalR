import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BusinessService } from "./Service/business.service";
import { ChatNotification } from './Classes/ChatNotification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OneTranzact';
  hubConnection: signalR.HubConnection | null = null;
  connectionId: string | null = null;
  chatNotifications: ChatNotification[] = [];

  constructor(private http: HttpClient, private businessService: BusinessService) {}

  ngOnInit(): void {
    const token = this.getAccessToken();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5012/ConnectionHub', {
        withCredentials: true,
        accessTokenFactory: () => token
      })
      .build();

    this.hubConnection.onreconnecting(err => {
      console.warn('Connection lost, reconnecting...', err);
    });

    this.hubConnection.onreconnected(async connectionId => {
      console.log('Reconnected. Connection ID:', connectionId);
      this.connectionId = await this.getConnectionId(); // Update connection ID on reconnect
    });

    this.hubConnection.onclose(err => {
      console.error('Connection closed. Trying to reconnect...', err);
    });

    this.startConnection()
        .then(() => this.registerListeners());
  }

  private getAccessToken(): string {
    // Ideally, this should come from a secure service or local storage
    return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNzA4MDcwODAwMSIsImp0aSI6IjVjMWY5NzliLWMyYWQtNGM5MS1hY2MwLWQ4NjQ5MThlMTUzYyIsIlVzZXJJZCI6IjMyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTm9ybWFsLVVzZXIiLCJleHAiOjE3Mjk5NTM4MDUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzEwOSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEwMCJ9.HiNxbv9Rksc5pllMGyVh2TYaiX0UcZkY1YwcIwBsZQo";
  }

  private async startConnection(): Promise<void> {
    try {
      await this.hubConnection?.start();
      console.log('Connection started');
      this.connectionId = await this.getConnectionId();
      console.log("Connection ID: ", this.connectionId);
    } catch (err) {
      console.error('Error while starting connection: ', err);
    }
  }

  private async getConnectionId(): Promise<string | null> {
    try {
      const id = await this.hubConnection?.invoke('GetConnectionId'); // Ensure this method exists in your hub
      return id;
    } catch (err) {
      console.error('Error while fetching connection ID: ', err);
      return null;
    }
  }

  private registerListeners(): void {
    this.hubConnection?.on('ConnectionConfirmed', (connectionId: string) => {
        console.log('Connection confirmed with ID: ', connectionId);
        this.connectionId = connectionId; // Store the connection ID
    });

    this.hubConnection?.on('AddUpdateChat', (data: ChatNotification) => {
        console.log('Chat updated: ', data);
        this.chatNotifications.push(data);
        console.log('Received data from AddUpdateChat: ', JSON.stringify(data, null, 2));
    });
}

}
