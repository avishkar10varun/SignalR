import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authenticate/auth.guard';
import { BusinessFormComponent } from '../business/business-form/business-form.component';
import { ContactUsListComponent } from '../ContactUs/contact-us-list/contact-us-list.component';
import { ContactUsComponent } from '../ContactUs/contact-us/contact-us.component';
import { BusinessListFormComponent } from './business-list-form/business-list-form.component';
import { IndividualFormsListComponent } from './individual-forms-list/individual-forms-list.component';
import { UserProfileComponent } from './individual-forms-list/user-profile/user-profile.component';
import { RoleComponent } from './role/role.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'UserList', component: UserListComponent , canActivate: [AuthGuard]},
  { path: 'Role', component: RoleComponent , canActivate: [AuthGuard]},
  { path: 'IndividaulListFroms', component: IndividualFormsListComponent , canActivate: [AuthGuard]},
  { path: 'IndividaulListFroms/:Id', component: UserProfileComponent , canActivate: [AuthGuard]},
  { path: 'BusinessListForm', component: BusinessListFormComponent , canActivate: [AuthGuard]},
  { path: 'ContactUsList', component: ContactUsListComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
