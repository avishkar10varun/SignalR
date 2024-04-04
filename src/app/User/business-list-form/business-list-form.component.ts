import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BusinessService } from 'src/app/Service/business.service';
import { UserService } from 'src/app/Service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-list-form',
  templateUrl: './business-list-form.component.html',
  styleUrls: ['./business-list-form.component.scss']
})
export class BusinessListFormComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  SearchUserForm: any;
  displayColumn: string[] = ['CompanyName','CompanyRegNo','Phone','Email','State','FinancingAmount','PurposeOfUse'];
  dataSource!: any;
  ImageUrl: any;
  constructor(private toaster: ToastrService,
    private BusinessService: BusinessService) { }

  ngOnInit(): void {
    this.ImageUrl = environment.ImageUrl
    this.getAllBusinessFormList();
  }

  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllBusinessFormList(){
    this.BusinessService.getBusinessLoanForm().subscribe((res) =>{
      debugger
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
    },
    ({error}) =>{
       this.toaster.error(error.message);
    }
    )
  }
  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
