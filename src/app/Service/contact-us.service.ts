import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  BaseUrl = environment.BaseUrl
  constructor(private http: HttpClient) { }

  addContactUsForm(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'ContactUs/AddContactUsForm',data);
  }
  getContactUsForm(): Observable<any>{
    return this.http.get(this.BaseUrl + 'ContactUs/GetContactUsForm');
  }
}
