import { Component, OnInit } from '@angular/core';
import {PatientLoginData} from '../patientLoginData';
import {PatientRegistrationService} from '../patient-registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {

  public patientLoginDetails = new PatientLoginData('', '');
  message: any;

  constructor(private service: PatientRegistrationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  public login(value: any) {
    const res = this.service.loginWithSecurity(this.patientLoginDetails);
    res.subscribe(data => this.message = data,
      error => console.log(error));
    console.log(value);
  }
}
