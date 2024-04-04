import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  addUser(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Auth/Register',data);
  }
  updateUser(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Auth/UpdateUser',data);
  }
  getAllUser(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/GetAllUser');
  }
  deleteUser(UserId: string): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/DeleteUser?UserId='+ UserId);
  }
  loginUser(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Auth/Login',data);
  }

  forgetPassword(data: any): Observable<any>{
    return this.http.post(this.BaseUrl +'Auth/ResetUserPassword',data);
  }
  ResetPass(data: any): Observable<any>{
    return this.http.post(this.BaseUrl +'Application/ResetPassword',data);
  }
  SendVarificationCode(data: any): Observable<any>{
    return this.http.get(this.BaseUrl +'Application/SendVarificationCode?UserName='+data);
  }

  getAllRole(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/GetAllRole');
  }
  AddRole(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Application/AddRole',data);
  }
  UpdateRole(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Application/UpdateRole',data);
  }
  DeleteRole(data:any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/DeleteRole?RoleId='+data);
  }

  roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRole =localStorage.getItem('role');
   allowedRoles.forEach((element: string) => {
     if (userRole == element) {
       isMatch = true;
     }
   });
   return isMatch;
 }
}

