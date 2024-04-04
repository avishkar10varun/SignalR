import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessFormComponent } from './business-form/business-form.component';

const routes: Routes = [
  {path: 'BusinessForm', component: BusinessFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
