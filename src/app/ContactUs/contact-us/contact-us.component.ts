import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from 'src/app/Service/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  ContactUsForm: any;

  constructor(private fb: FormBuilder,
    private ContactUsService: ContactUsService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.ContactUsForm = this.fb.group({
      Name: new FormControl('',[Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]),
      Phone: new FormControl('',[Validators.required]),
      Purpose: new FormControl('',[Validators.required]),
      Message: new FormControl('',[Validators.required]),
     // Capcha: new FormControl('',[Validators.required]),
    })
  }

  AddForm(){
    const key = {
      Name: this.ContactUsForm.value.Name,
      Email: this.ContactUsForm.value.Email,
      Phone: this.ContactUsForm.value.Phone,
      Purpose: this.ContactUsForm.value.Purpose,
      Message: this.ContactUsForm.value.Message,
      Capcha: true
    }
    this.ContactUsService.addContactUsForm(key).subscribe(res =>{
      this.toaster.success(res.message);
      window.location.reload();
    },
    (error) =>{
      this.toaster.error(error.message);
    })
  }
}
