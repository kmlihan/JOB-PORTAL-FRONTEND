import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CompaniesComponent } from './pages/companies/companies.component';

import { UsersComponent } from './pages/users/users.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { CreateJobPageComponent } from './pages/create-job-page/create-job-page.component';

import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { CreateJobComponent } from './pages/create-job/create-job.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { EditJobComponent } from './pages/edit-job/edit-job.component';
import { AppConfig } from './config';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';



const routes: Routes = [

  { path: 'users', component: UsersComponent,  canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'users/:id', component: EditUserComponent},
  { path: 'companies', component: CompaniesComponent,  canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'companies/:id', component: EditCompanyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'jobs/new', component: CreateJobComponent ,  canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: EditJobComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', component: JobsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
