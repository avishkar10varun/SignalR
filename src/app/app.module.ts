import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './Shared/layout/layout.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './Shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';

import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from "@angular/material/sidenav";
import { BusinessModule } from './business/business.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserModule } from './User/user.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authInterceptor } from './authenticate/auth.interceptor';
import { MasterHomeComponent } from './master-home/master-home.component';
import { TranszactServiceComponent } from './transzact-service/transzact-service.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ContactUsComponent } from './ContactUs/contact-us/contact-us.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BlogsComponent } from './blogs/blogs.component';
import { EmptyComponent } from './empty/empty.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    ForbiddenComponent,
    MasterHomeComponent,
    TranszactServiceComponent,
    ContactUsComponent,
    BlogsComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgxMatFileInputModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    MatRadioModule,
    NgxCaptchaModule,
    BusinessModule,
    UserModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
