import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/Service/user.service';
import { LoginComponent } from 'src/app/User/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  LogoutBtn: any;

  constructor(private translate: TranslateService,
    private dialog: MatDialog,
    public UserService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');

    this.showLogoutBtn()
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  showLogoutBtn(){
    const token = localStorage.getItem('token');
    this.LogoutBtn = (token === null || token === undefined)? false: true;
  }
  LoginDialog(){
    const dialogRef = this.dialog.open(LoginComponent,{
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.showLogoutBtn();
    })
    
  }

  Logout(){
    localStorage.removeItem('token');
    this.showLogoutBtn();
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('role');
    localStorage.removeItem('userRoleName');
    localStorage.removeItem('userName');
    this.router.navigate(['/Individual']);
  }
}
