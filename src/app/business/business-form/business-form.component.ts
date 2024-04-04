import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoanService } from '../../Service/loan.service';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from 'src/app/Service/business.service';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit {
  BusinessLoanFrom: any;
  StateDDL: any;
  PurposeDDL: any;

  constructor(private fb: FormBuilder,
    private loanService: LoanService,
    private toaster: ToastrService,
    private BusinessService: BusinessService,
    ) { }

  ngOnInit(): void {
    this.BusinessLoanFrom = this.fb.group({
      FinancingAmount: new FormControl('',Validators.required),
      PurposeofUsageId: new FormControl('',Validators.required),
      CompanyName: new FormControl('',Validators.required),
      CompanyRegNo: new FormControl('',Validators.required),
      Email:new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      Phone: new FormControl('',Validators.required),
      StateId: new FormControl('',Validators.required),
     // Notes: new FormControl('',Validators.required),
    })
    this.getAllStates();
    this.getAllPurposeOfUsages();
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  getAllStates(){
    this.loanService.GetAllStates().subscribe(res => {
      this.StateDDL = res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  getAllPurposeOfUsages(){
    this.loanService.GetAllPurposeOfUsages().subscribe(res => {
      this.PurposeDDL = res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  
  SubmitForm(){
    const key = {
      FinancingAmount: this.BusinessLoanFrom.value.FinancingAmount,
      PurposeofUsageId: this.BusinessLoanFrom.value.PurposeofUsageId,
      CompanyName: this.BusinessLoanFrom.value.CompanyName,
      CompanyRegNo: this.BusinessLoanFrom.value.CompanyRegNo,
      Email: this.BusinessLoanFrom.value.Email,
      Phone: this.BusinessLoanFrom.value.Phone,
      StateId: this.BusinessLoanFrom.value.StateId,
     // Notes: this.BusinessLoanFrom.value.Notes,
    }
    this.BusinessService.addBusinessLoanForm(key).subscribe((res: any) =>{
      window.location.reload();
      this.toaster.success(res.message);
    },
    ({error}) => {
      this.toaster.error(error.message);
    })
  }
 

}


