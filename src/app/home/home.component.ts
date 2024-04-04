import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoanService } from '../Service/loan.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  LoanFrom: any;
  StateDDL: any;
  RefernceInfoDDL: any;
  KadICFront: any;
  KadICBack: any;
  PaySlipMonth: any;
  BankStatementMonth: any;
  LatestEPF: any;
  Bill_File: any;
  PurposeDDL: any;

  constructor(private fb: FormBuilder,
    private loanService: LoanService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.LoanFrom = this.fb.group({
      FinancingAmount: new FormControl('',Validators.required),
      PurposeofUsageId: new FormControl('',Validators.required),
      Title: new FormControl('',Validators.required),
      Name: new FormControl('',Validators.required),
      NewICNo: new FormControl('',Validators.required),
      Email:new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      Phone: new FormControl('',Validators.required),
      // ReferenceInfoId: new FormControl('',Validators.required),
      StateId: new FormControl('',Validators.required),
      KadICFront: new FormControl('',Validators.required),
      KadICBack: new FormControl('',Validators.required),
      PaySlipMonth: new FormControl('',Validators.required),
      BankStatementMonth: new FormControl('',Validators.required),
      LatestEPF: new FormControl('',Validators.required),
      Bill_File: new FormControl('',Validators.required),
    })
    this.getAllStates();
   // this.getAllReferenceInfo();
    this.getAllPurposeOfUsages();
  }

  getAllStates(){
    this.loanService.GetAllStates().subscribe(res => {
      this.StateDDL = res;
      debugger
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  // getAllReferenceInfo(){
  //   this.loanService.GetAllReferenceInfo().subscribe(res => {
  //     this.RefernceInfoDDL = res;
  //     debugger
  //   },
  //   ({error}) =>{
  //     this.toaster.error(error.message);
  //   })
  // }
  getAllPurposeOfUsages(){
    this.loanService.GetAllPurposeOfUsages().subscribe(res => {
      this.PurposeDDL = res;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  onKadICFrontFileChanged(event: any) {
    this.KadICFront = event.target.files[0];
  }
  onKadICBackFileChanged(event: any) {
    this.KadICBack = event.target.files[0];
  }
  onPaySlipMonthFileChanged(event: any) {
    debugger
    this.PaySlipMonth = event.target.files;
  }
  onBankStatementMonthFileChanged(event: any) {
    this.BankStatementMonth = event.target.files[0];
  }
  onLatestEPFFileChanged(event: any) {
    this.LatestEPF = event.target.files[0];
  }
  onBill_FileFileChanged(event: any) {
    this.Bill_File = event.target.files[0];
  }
  
  SubmitForm(){
    this.spinner.show();
    const key = {
      FinancingAmount: this.LoanFrom.value.FinancingAmount,
      PurposeofUsageId: this.LoanFrom.value.PurposeofUsageId,
      Title: this.LoanFrom.value.Title,
      Name: this.LoanFrom.value.Name,
      NewICNo: this.LoanFrom.value.NewICNo,
      Email: this.LoanFrom.value.Email,
      Phone: this.LoanFrom.value.Phone,
      // ReferenceInfoId: this.LoanFrom.value.ReferenceInfoId,
      StateId: this.LoanFrom.value.StateId,
    }
    const formData = new FormData();
    for (let index = 0; index < this.PaySlipMonth.length; index++) {
      formData.append('PaySlipMonth', this.PaySlipMonth[index]);
    }
    formData.append('KadICFront', this.KadICFront);
    formData.append('KadICBack', this.KadICBack);
    formData.append('BankStatementMonth', this.BankStatementMonth);
    formData.append('LatestEPF', this.LatestEPF);
    formData.append('Bill_File', this.Bill_File);
    
    formData.append('FormData', JSON.stringify(key));
    this.loanService.addIndividualForm(formData).subscribe((res: any) =>{
      this.spinner.hide();
      window.location.reload();
      this.toaster.success(res.message);
    },
    ({error}) => {
      this.spinner.hide();
      this.toaster.error(error.message);
    })
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
}
