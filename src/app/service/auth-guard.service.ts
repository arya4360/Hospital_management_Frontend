import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {DoctorService} from '../doctor.service';
import {PatientRegistrationService} from '../patient-registration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  userLoggedIn = false;

  constructor() { }


  canActivate(): boolean{
    if (this.userLoggedIn ){
      return true;
    }else {
      return false;
    }
  }

}
