import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  GetAllStates(): Observable<any>{
    return this.http.get<any>(this.BaseUrl + 'Loan/GetAllState');
  }
  GetAllReferenceInfo(): Observable<any>{
    return this.http.get<any>(this.BaseUrl + 'Loan/GetAllReferenceInfo');
  }
  GetAllPurposeOfUsages(): Observable<any>{
    return this.http.get<any>(this.BaseUrl + 'Loan/GetAllPurposeOfUsage');
  }

  addIndividualForm(data: any): Observable<any>{
    return this.http.post<any>(this.BaseUrl + 'Loan/AddIndividualLoanForm', data);
  }
  getIndividualForm(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Loan/GetIndividualLoanForm');
  }
  getIndividualFormById(data: any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Loan/GetIndividualLoanFormById?Id='+ data);
  }
}
