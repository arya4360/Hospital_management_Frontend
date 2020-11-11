import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import {PatientRegistrationService} from './patient-registration.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DoctorService} from './doctor.service';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {ReceptionService} from './reception.service';
import {MatSliderModule} from '@angular/material/slider';
import {AuthGuardService} from './service/auth-guard.service';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    MatSliderModule
  ],
  providers: [PatientRegistrationService , DoctorService, ReceptionService, AuthGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

