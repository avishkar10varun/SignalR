import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterFormMode!: boolean;
  RegisterForm: any;
  RolesDDL: any;
  local_data: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private UserService: UserService,
    private toaster:ToastrService,
    private spinner: NgxSpinnerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.local_data = {...data}
    }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      UserId: new FormControl(''),
      FirstName: new FormControl ('', [Validators.required]),
      LastName: new FormControl ('', [Validators.required]),
      Email:new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      RoleId: new FormControl ('', [Validators.required]),
      Password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    })
    const key = this.local_data.element;
    this.RegisterFormMode = this.local_data?.RegisterFormMode;
    this.getAllRoles();
    this.editUser(key);
  }
  editUser(element: any) {
    if(element !== undefined){
      const key = this.RegisterForm.get('Password');
      const key1 = this.RegisterForm.get('ConfirmPassword');
      key.setValidators('');
      key1.setValidators('');

      let UserName = element.userName.split(" ");
      this.RegisterForm.get('UserId')?.setValue(element.userId);
      this.RegisterForm.get('RoleId')?.setValue(element.roleId);
      this.RegisterForm.get('FirstName')?.setValue(UserName[0]);
      this.RegisterForm.get('LastName')?.setValue(UserName[1]);
      this.RegisterForm.get('Email')?.setValue(element.email);
      this.RegisterForm.get('Role')?.setValue(element.roleName);
      this.RegisterForm.get('OfficeId')?.setValue(element.officeId);
    }
  }

  getAllRoles(){
    this.UserService.getAllRole().subscribe((res: any) =>{
      this.RolesDDL = res;
    },
    (error) =>{
      this.toaster.error(error.message);
    })
  }

  SaveUser(){
    const UserId = this.RegisterForm.value.UserId;
    debugger
    if(UserId === undefined || UserId === ""){
      this.AddUser();
    }
    else{
      this.UpdateUser();
    }
  }
  UpdateUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Update User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const data = {
          FirstName: this.RegisterForm.get('FirstName')?.value,
          LastName: this.RegisterForm.get('LastName')?.value
        }
      const key = {
        UserName: this.RegisterForm.get('Email')?.value,
        Email: this.RegisterForm.get('Email')?.value,
        FullName: data.FirstName + " " + data.LastName,
        RoleId: this.RegisterForm.get('RoleId')?.value,
      }
      this.UserService.updateUser(key).subscribe((res: any) =>{
        this.spinner.hide();
        Swal.fire({
          title: 'Updated!',
          text: 'Your selected User has been Updated.',
          icon: 'success',
          timer: 800,
          showConfirmButton: false,
        })
        this.RegisterForm.reset();
        this.closeDialog();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error(error.message);
      }
      )}
    });
  }
  
  AddUser() {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Add User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const data = {
          FirstName: this.RegisterForm.value.FirstName,
          LastName: this.RegisterForm.value.LastName
        }
        const key = {
          UserName: this.RegisterForm.value.Email,
          Email: this.RegisterForm.value.Email,
          FullName: data.FirstName + " " + data.LastName,
          RoleId: this.RegisterForm.value.RoleId,
          Password: this.RegisterForm.value.Password,
          ConfirmPassword: this.RegisterForm.value.ConfirmPassword
        }
        if(key.Password === key.ConfirmPassword){
          this.UserService.addUser(key).subscribe((res: any) =>{
            this.spinner.hide();
        Swal.fire({
          title: 'Added!',
          text: 'Your selected User has been Added.',
          icon: 'success',
          timer: 800,
          showConfirmButton: false,
        })
        this.RegisterForm.reset();
        this.closeDialog();
          },
          ({error}) =>{
            this.spinner.hide();
            this.toaster.error(error.message);
          });
        }
        else(
          this.spinner.hide(),
          this.toaster.error("Password and confirm Password not match")
        )
      }
    });
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
