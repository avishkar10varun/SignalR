import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  Token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0OTY1ZjBkNC04YzJmLTQ5OGItOTc1Mi0yOTFmNDRkM2E2NWYiLCJmYW1pbHlfbmFtZSI6IjQvMTYvMjAyMyAyOjMzOjUwIFBNIiwiaWF0IjoiNC8xNi8yMDIzIDI6MzM6NTAgUE0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiT3phaXIuSGFxQEliZXguQ28iLCJVc2VySWQiOiI0NSIsIlVzZXJOYW1lIjoiT3phaXIuSGFxQEliZXguQ28iLCJGdWxsTmFtZSI6Ik96YWlyIEhhcSIsImV4cCI6MTY4MTc0MjAzMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjkvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCJ9.9OSIrJnxb9WHhV6MaOU2k_-kkZRgSL8yuoDM5nc25ZU";
  Key = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0";
  BaseUrl = environment.BaseUrl
  constructor(private http: HttpClient) { }

  addBusinessLoanForm(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Loan/AddBusinessForm', data);
  }
  getBusinessLoanForm(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Loan/GetBusinessLoanForm');
  }

  GetTestData(): Observable<any>{
    return this.http.get('http://localhost:5019/api/SignalRConnector/GetTestData');
  }

  GetUserData(data: any): Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.Token,
      'X-APP-KEY': this.Key
    });
    const httpOptions = {
      headers: headers_object
    };
    var result =  this.http.post('http://localhost:5019/api/Report/GetAgentReport',data, { responseType: 'text' });
    debugger
    return result;
  }

  GetNootBook(data: any){
    var result =  this.http.post('http://risaan.com/NootBooks/AddNoteBookUser',data);
    debugger
    return result;
  }

}
