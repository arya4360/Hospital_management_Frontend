import { Component, OnInit } from '@angular/core';
import {Patient} from '../patient';
import {PatientRegistrationService} from '../patient-registration.service';
import {PatientLoginData} from '../patientLoginData';
import {Router} from '@angular/router';
import {AuthGuardService} from '../service/auth-guard.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

 public patient = new Patient(   '', '', '', '', '', '', '', '', '', '');
  public patientLoginData = new PatientLoginData('', '');
 message: any;
 allPatients: any = [] ;
  constructor(private service: PatientRegistrationService , private router: Router, private authService: AuthGuardService) {}

  ngOnInit(): void {
  }

    public registerPatient(value: any): void {
    const response = this.service.doRegistration(this.patient);
    response.subscribe(data => this.message = data);
  }

  public loginPatient(value: any): void {
    let flag: number ;
    flag = 0 ;
    // get all patients details so to validate form during login
    this.service.getAllPatientService().subscribe(data => this.allPatients = data);
    for (const patients of this.allPatients) {
      if (patients.username === this.patientLoginData.username && patients.password === this.patientLoginData.password){
        if (patients.verify === true){                      // verification of patient by receptionist to login
          this.authService.userLoggedIn = true;               // authguard permission to route to component
          const res = this.service.login(this.patientLoginData);
          res.subscribe(data => this.message = data,
            error => console.log('Exception occoured'));
          res.subscribe(data => this.service.setLoggedId(data));   // save the id of the loggedin patient
          flag = 1 ;
        }else{
          flag = 1 ;
          alert('Patient is not verified yet by the receptionist');
        }
      }
    }
    if (flag === 0){
      alert('Please enter correct username and password');
    }
  }
}
