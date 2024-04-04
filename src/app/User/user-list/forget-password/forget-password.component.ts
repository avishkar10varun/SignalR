import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ForgetPasswordForm: any;
  local_data: any;

  constructor(private fb:FormBuilder,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private userService: UserService,
    private router: Router) {
      this.local_data = {...data}
  }
  ngOnInit(): void {
    this.ForgetPasswordForm = this.fb.group({
      // UserId: new FormControl(''),
      VarificationCode: new FormControl('',[Validators.required]),
      Password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    })
    this.ForgetPasswordForm.get('UserId')?.setValue(this.local_data.element.userId);
  }

  ForgetPassword(){
    const key ={
      UserId: localStorage.getItem("userId"),
      VarificationCode: this.ForgetPasswordForm.value.VarificationCode,
      Password: this.ForgetPasswordForm.value.Password,
      ConfirmPassword: this.ForgetPasswordForm.value.ConfirmPassword
    }
    if(key.Password === key.ConfirmPassword){
      this.userService.forgetPassword(key).subscribe((res: any) =>{
        this.toaster.success(res.message);
        this.router.navigate(['/login']);
      },
      ({error}) =>{
        this.toaster.error(error.message);
        
      }
      )
    }else{
      this.toaster.warning("Password and ConfirmPasssword not equals");
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
