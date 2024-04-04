import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    BusinessFormComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule
  ]
})
export class BusinessModule { }
