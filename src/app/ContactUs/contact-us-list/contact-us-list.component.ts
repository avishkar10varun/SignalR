import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsService } from 'src/app/Service/contact-us.service';

@Component({
  selector: 'app-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumn: string[] = ['Name','Email','Phone','Purpose','Message','Action'];
  dataSource!: any;

  constructor(private ContactUsService: ContactUsService,
    private toaster: ToastrModule) { }

  ngOnInit(): void {
    this.GetAllContactUsForm();
  }
  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  GetAllContactUsForm() {
    this.ContactUsService.getContactUsForm().subscribe(res =>{
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
    })
  }

  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
