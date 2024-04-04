import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService} from '../../Service/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('displayResetPasswordModal') private displayResetPasswordModal!: any;
  LoginForm: any;
  ResetForm: any;

  constructor(private fb: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    private UserService:UserService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      UserName: new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      Password: new FormControl('' , [Validators.required])
    });
    this.ResetForm = this.fb.group({
      UserName: ['', [Validators.required,Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]],
    })
  }

  LoginUser(){
    this.spinner.show();
    const key ={
      UserName: this.LoginForm.value.UserName,
      Password: this.LoginForm.value.Password
    }
    this.UserService.loginUser(key).subscribe((res: any) => {
      this.spinner.hide();
      this.toaster.success(res.message);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('expiryDate', res.expiration);
      localStorage.setItem('role', res.role);
      localStorage.setItem('userRoleName', res.role);
      localStorage.setItem('userName', res.userName);
      this.resetForm();
      this.dialog.closeAll();
    },
    ({error}) =>{
      this.spinner.hide();
      this.toaster.error(error.message);
    }
    )
  }
  ResetPassword(){
    this.PasswordResetForm();
    this.dialog.open(this.displayResetPasswordModal, { height: '60%', width: '30%' });
  }
  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  resetForm() {
    this.LoginForm.reset();
  }
  SendVarificationCode(){
    const key = this.ResetForm.value.UserName;

    this.UserService.SendVarificationCode(key).subscribe((res: any) => {
      this.toaster.success(res.message);
    },
    ({error}) => {
      this.toaster.error(error.message);
    })
  }
  BackBtn(){
    this.PasswordResetForm();
    this.dialog.closeAll();
  }

  PasswordResetForm(){
    this.ResetForm.reset();
  }
}
