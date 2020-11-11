import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientRegistrationComponent} from './patient-registration/patient-registration.component';
import {HomeComponent} from './home/home.component';
import {PatientDashboardComponent} from './patient-dashboard/patient-dashboard.component';
import {PatientLoginComponent} from './patient-login/patient-login.component';
import {DoctorLoginComponent} from './doctor-login/doctor-login.component';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {LogoutComponent} from './logout/logout.component';
import {ReceptionLoginComponent} from './reception-login/reception-login.component';
import {ReceptionDashboardComponent} from './reception-dashboard/reception-dashboard.component';
import {AuthGuardService} from './service/auth-guard.service';

const routes: Routes = [
  {path: '' , redirectTo: '//home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'patient-registration', component: PatientRegistrationComponent},
  {path: 'patient-dashboard', component: PatientDashboardComponent, canActivate: [AuthGuardService]},
  {path: 'patient-login', component: PatientLoginComponent},
  {path: 'doctor-login', component: DoctorLoginComponent},
  {path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'reception-login', component: ReceptionLoginComponent},
  {path: 'reception-dashboard', component: ReceptionDashboardComponent, canActivate: [AuthGuardService]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// tslint:disable-next-line:max-line-length
export const routingComponent = [PatientRegistrationComponent, HomeComponent, PatientDashboardComponent, PatientLoginComponent, DoctorLoginComponent, DoctorDashboardComponent, LogoutComponent, ReceptionLoginComponent, ReceptionDashboardComponent];
