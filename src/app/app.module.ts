import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { AddressComponent } from './forms/address/address.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegistrationSuccessDialogComponent } from './components/registration-success-dialog/registration-success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';

import { CreateJobPageComponent } from './pages/create-job-page/create-job-page.component';
import { QualificationEntryComponent } from './components/qualification-entry/qualification-entry.component';
import { ExperienceEntryComponent } from './components/experience-entry/experience-entry.component';
import { SafePipe } from './pipes/safePipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CeilPipe } from './pipes/ceil.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { DisableControlDirectiveDirective } from './directives/disable-control-directive.directive';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { CreateJobComponent } from './pages/create-job/create-job.component';

import { SelectCompanyComponent } from './components/select-company/select-company.component';
import { JobCardComponentComponent } from './components/job-card-component/job-card-component.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { EditJobComponent } from './pages/edit-job/edit-job.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';


export function tokenGetter() {
  return localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!).token
    : null;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CompaniesComponent,
    UsersComponent,
    AboutComponent,
    ContactComponent,
    AddressComponent,
    RegistrationSuccessDialogComponent,
    ErrorDialogComponent,
    CustomTableComponent,
    CreateJobPageComponent,
    QualificationEntryComponent,
    ExperienceEntryComponent,
    SafePipe,
    ConfirmDialogComponent,
    CeilPipe,
    PaginatorComponent,
    EditUserComponent,
    DisableControlDirectiveDirective,
    EditCompanyComponent,
    CreateJobComponent,
    SelectCompanyComponent,
    JobCardComponentComponent,
    JobsComponent,
    EditJobComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/api/auth/'],
      },
    }),
  ],
  providers: [provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
