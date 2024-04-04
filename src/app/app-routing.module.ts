import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authenticate/auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactUsComponent } from './ContactUs/contact-us/contact-us.component';
import { EmptyComponent } from './empty/empty.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { MasterHomeComponent } from './master-home/master-home.component';
import { LayoutComponent } from './Shared/layout/layout.component';
import { TranszactServiceComponent } from './transzact-service/transzact-service.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '', component: MasterHomeComponent },
      { path: 'MasterHome', component: MasterHomeComponent },
      { path: 'Individual', component: HomeComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'ContactUs', component: ContactUsComponent },
      { path: 'Blogs', component: BlogsComponent }, 
      { path: 'Empty', component: EmptyComponent },  
    ], 
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    component: LayoutComponent,
    children: [
      {
        path: 'Business',
        loadChildren: () =>
          import('./business/business.module').then((m) => m.BusinessModule),
      },
      {
        path: 'User',
        // data: {permittedRoles: ['Admin']},
        loadChildren: () =>
          import('./User/user.module').then((m) => m.UserModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
