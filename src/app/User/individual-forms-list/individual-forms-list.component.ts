import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from 'src/app/Service/business.service';
import { LoanService } from 'src/app/Service/loan.service';

@Component({
  selector: 'app-individual-forms-list',
  templateUrl: './individual-forms-list.component.html',
  styleUrls: ['./individual-forms-list.component.scss']
})
export class IndividualFormsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  SearchUserForm: any;
  displayColumn: string[] = ['Name','Phone','NewIcNo','Email','State','FinancingAmount','PurposeOfUse','Action'];
  dataSource!: any;
  constructor(private toaster: ToastrService,
    private IndividualService: LoanService,
    private router: Router) { }

  ngOnInit(): void {
    this.getIndividualFormList();
  }

  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIndividualFormList(){
    this.IndividualService.getIndividualForm().subscribe((res) =>{
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
  ShowProfile(element: any): any{
    debugger
    this.router.navigate(["/User/IndividaulListFroms/" + element.id]);
  }
}
