import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild('displayRoleModal') private displayRoleModal!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  SearchUserForm: any;
  displayColumn: string[] = ['Role',"Action"];
  dataSource!: any;
  RoleForm: any;
  local_data: any;
  constructor(private dialog: MatDialog,
    private toaster: ToastrService,
    private UserService: UserService,
    private fb: FormBuilder,
    private router: Router) {
     
    }

  ngOnInit(): void {
    this.RoleForm = this.fb.group({
      RoleId: [''],
      RoleName: ['',[Validators.required]]
    })
    this.getAllRoles();
  }

  getAllRoles(){
    this.UserService.getAllRole().subscribe((res) =>{
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
    },
    ({error}) =>{
       this.toaster.error(error.message);
    }
    )
  }

  RolePupup(){
    this.Reset();
    this.dialog.open(this.displayRoleModal, { height: '60%', width: '30%'});
  }
  

  editRole(element: any){
    this.Reset();
    this.RoleForm.get('RoleId')?.setValue(element.roleId);
    this.RoleForm.get('RoleName')?.setValue(element.name);
    this.dialog.open(this.displayRoleModal, { height: '60%', width: '30%'});
  }

  AddOrEdit(){
    const key ={
      RoleId: this.RoleForm.value.RoleId,
      RoleName: this.RoleForm.value.RoleName
    }
    if(key.RoleId === undefined || key.RoleId === null){
      this.AddRole();
    } 
    else{
      this.UpdateRole(key)
    }
  }

  UpdateRole(data: any) {
    const key = {
      RoleId: data.RoleId,
      RoleName: data.RoleName
    }
    this.UserService.UpdateRole(key).subscribe((res: any) =>{
      this.toaster.success(res.message);
      this.dialog.closeAll();
      this.getAllRoles();
      this.RoleForm.get('RoleId')?.setValue('');
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  AddRole() {
    const key = {
      RoleName:  this.RoleForm.value.RoleName
    }
    this.UserService.AddRole(key).subscribe((res: any) =>{
      this.toaster.success(res.message);
      this.getAllRoles();
      this.dialog.closeAll();
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  deleteRole(element: any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete Role!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        const key = element.roleId;
        this.UserService.DeleteRole(key).subscribe((res: any) =>{
          Swal.fire({
            title: 'Deleted!',
            text: 'Your selected Role has been Deleted.',
            icon: 'success',
            timer: 800,
            showConfirmButton: false,
          })
          this.getAllRoles();
        },
        ({error}) =>{
          this.toaster.error(error.message);
        });  
      }
    });
  }
  ListInRole(element: any){
    const RoleId = element.value;
    this.router.navigate(['User/RoleAssignUser/' + RoleId]);
  }
  BackBtn(){
    this.dialog.closeAll();
  }
  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  Reset() {
    this.RoleForm.reset();
  }
  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
