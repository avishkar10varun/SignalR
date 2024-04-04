import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../Service/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private UserService : UserService) {
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token != null){
      const expiry = (JSON.parse(atob(token!.split('.')[1]))).exp;
      const isTokenExpired =  (Math.floor((new Date).getTime() / 1000)) >= expiry;
      if(!isTokenExpired){
        let roles = next.data['permittedRoles'] as Array<string>;
        if(roles){
          if(this.UserService.roleMatch(roles)) return true;
          else
          {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        return true;
      }
      this.router.navigate(['/MasterHome']);
      return false;
    }
    else {
      this.router.navigate(['/Individual']);
      return false;
    }

  }
  
}