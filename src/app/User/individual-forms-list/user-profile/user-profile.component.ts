import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from 'src/app/Service/loan.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Id: any;
  FormDDL!: any;
  ImageUrl: any;
  PaySlipOne: any;
  PaySlipTwo: any;
  PaySlipThree: any;
  name: any;
  phone: any;
  newICNo: any;
  email: any;
  stateName: any;
  financingAmount: any;
  purposeofUsageName: any;
  createdBy: any;
  createdOn: any;
  kadICFront: any;
  kadICBack: any;
  bankStatementMonth: any;
  latestEPF: any;
  bill_File: any;

  constructor(private router: ActivatedRoute,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private Service: LoanService) {
    this.Id = this.router.snapshot.params?.['Id'];
   }

  ngOnInit(): void {
    this.ImageUrl = environment.ImageUrl;
    this.getUserProfile();
  }

  getUserProfile(){
    const key = this.Id;
    this.Service.getIndividualFormById(key).subscribe(res => {
     this.ProfileMethod(res);
    },
    (error) =>{
      this.toaster.error(error.message);
    })
  }
  ProfileMethod(res: any) {
    this.name = res.name;
    this.phone = res.phone;
    this.newICNo = res.newICNo;
    this.email = res.email;
    this.stateName = res.stateName;
    this.financingAmount = res.financingAmount;
    this.purposeofUsageName = res.purposeofUsageName;
    this.createdBy = res.createdBy;
    this.createdOn = res.createdOn;
    this.kadICFront = res.kadICFront;
    this.kadICBack = res.kadICBack;
    this.bankStatementMonth = res.bankStatementMonth;
    this.latestEPF = res.latestEPF;
    this.bill_File = res.bill_File;
    this.PaySlipOne =  res.paySlipMonth[0].imgURL;
    this.PaySlipTwo = res.paySlipMonth[1].imgURL;
    this.PaySlipThree = res.paySlipMonth[2].imgURL;
  }
}
