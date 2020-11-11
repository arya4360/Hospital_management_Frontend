import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../doctor.service';
import {DoctorLoginData} from '../doctorLoginData';
import {AuthGuardService} from '../service/auth-guard.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
  public doctorLoginData = new DoctorLoginData('', '' );
  welcomeMessage: any;
  allDoctors: any = [];
  constructor( private serviceDoctor: DoctorService, private authService: AuthGuardService) { }

  ngOnInit(): void {
    this.serviceDoctor.getAllDoctorsService().subscribe(data => this.allDoctors = data);
  }

  public loginMethod(value: any): any{
    let flag ;
    flag = 0 ;
    for (const doctors of this.allDoctors){
      // tslint:disable-next-line:max-line-length
      if (doctors.username === this.doctorLoginData.username && doctors.password === this.doctorLoginData.password){
        // login only if credential matches
        this.authService.userLoggedIn = true ;     // url guard
        const response = this.serviceDoctor.loginDoctorService(this.doctorLoginData);
        response.subscribe(data => this.welcomeMessage = data,
          error => console.log('Wrong Credentials'));
        response.subscribe(data => this.serviceDoctor.setId(data));
        flag = 1;
      }
      // tslint:disable-next-line:align
    } if (flag === 0){alert('Please enter correct username and password'); }
  }

}
