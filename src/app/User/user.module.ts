import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IndividualFormsListComponent } from './individual-forms-list/individual-forms-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AutoCompleteModule } from "primeng/autocomplete";
import { RoleComponent } from './role/role.component';
import { RegisterComponent } from './user-list/register/register.component';
import { ForgetPasswordComponent } from './user-list/forget-password/forget-password.component';
import { BusinessListFormComponent } from './business-list-form/business-list-form.component';
import { UserProfileComponent } from './individual-forms-list/user-profile/user-profile.component';
import {MatCardModule} from '@angular/material/card';
import { ContactUsListComponent } from '../ContactUs/contact-us-list/contact-us-list.component';



@NgModule({
  declarations: [
    LoginComponent,
    IndividualFormsListComponent,
    UserListComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    RoleComponent,
    BusinessListFormComponent,
    UserProfileComponent,
    ContactUsListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    TranslateModule,
    NgxSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    AutoCompleteModule,
    MatCardModule,
  ]
})
export class UserModule { }
