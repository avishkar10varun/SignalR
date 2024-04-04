import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from 'src/app/Service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('displayResetPasswordModal') private displayResetPasswordModal!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  SearchUserForm: any;
  displayColumn: string[] = ['UserName', 'Email', 'Role',"Action"];
  dataSource!: any;
  userAction: boolean = true;
  ResetForm: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private UserService: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { 
    }

  ngOnInit(): void {
    this.ResetForm = this.fb.group({
      UserId: new FormControl(''),
      Password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    })
    this.getAllUser();
  }

  getAllUser(){
    this.spinner.show();
    this.UserService.getAllUser().subscribe(res =>{
     this.spinner.hide();
     this.dataSource = new MatTableDataSource<any>(res);
     this.getPaginator();
    },
    (error) => {
      this.toaster.error(error.message);
    })
  }
  AddUser(){
    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '500px',
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser();
    })
  }

  editUser(element: any){
    const RegisterFormMode = this.userAction;
    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '500px',
      data: {element, RegisterFormMode}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser();
    })
  }
  deleteUser(element: any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        const userId  = element.userId
        this.UserService.deleteUser(userId).subscribe((res : any) => {
          this.spinner.hide();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your selected User has been deleted.',
              icon: 'success',
              timer: 800,
              showConfirmButton: false,
            })
            this.getAllUser();
          },
          (error) => {
            this.spinner.hide();
            this.toaster.error('Error', error.error.message);
          }
        );
      }
    });
  }
  ForgetPassword(){
    this.spinner.show();
    const key = {
      UserId: this.ResetForm.value.UserId,
      NewPassword: this.ResetForm.value.Password,
      ConfirmPassword: this.ResetForm.value.ConfirmPassword,
    }
    debugger
    this.UserService.forgetPassword(key).subscribe(res =>{
     this.spinner.hide();
     this.CloseDialog();
     this.toaster.success(res.message);
    },
    (error) => {
      this.spinner.hide();
      this.toaster.error(error.message);
    })
  }
  BackBtn(){
    this.dialog.closeAll();
    
  }
 
  CloseDialog(){
    this.dialog.closeAll();
    this.PasswordresetForm();
  }
  PasswordresetForm() {
    this.ResetForm.reset();
  }
  ForgetPasswordPopUp(element: any){
    this.ResetForm.get('UserId').setValue(element.userId);
    this.dialog.open(this.displayResetPasswordModal, { height: '70%', width: '30%'});
  }
  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
