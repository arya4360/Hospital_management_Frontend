import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../doctor.service';
import {Router} from '@angular/router';
import {ReceptionService} from '../reception.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
getLoggedId: any;
doctorDetails: any;
message: any ;
prescriptionMessage: any;
appointments: any = [] ;
appointmentDetails: any;
isFalseEditProfile = false ;
isTrueViewProfile = false;
isFalseAppointment = false ;
isFalseNewAppointment = false;
isFalsePrescription = false;
isFalseViewComplaint = false;

  public popoverTitle = 'Please Confirm' ;
  public popoverMessage = 'Are you sure you want to logout ?' ;
  public cancelClicked = false;
  constructor( private serviceDoctor: DoctorService,
               private router: Router,
               private serviceReception: ReceptionService) {
    this.serviceDoctor.getId.subscribe(data => this.getLoggedId = data) ;
  }

  ngOnInit(): void {
  }
  public updateDoctorDetails(): void{
    const res = this.serviceDoctor.updateDoctorService(this.doctorDetails);
    res.subscribe(updateData => this.message = updateData) ;
  }

  public EditProfile(): void{
    const response = this.serviceDoctor.getDoctorService(this.getLoggedId);
    response.subscribe(data => this.doctorDetails = data) ;
    this.isFalseEditProfile = true ;
    this.isTrueViewProfile = false ;
    this.isFalseAppointment = false ;
    this.isFalsePrescription = false ;
    this.isFalseNewAppointment = false ;
    this.isFalseViewComplaint = false;
  }

  public viewProfile(): void{
    const response = this.serviceDoctor.getDoctorService(this.getLoggedId);
    response.subscribe(data => this.doctorDetails = data) ;
    this.isFalseEditProfile = false;
    this.isTrueViewProfile = true ;
    this.isFalseAppointment = false;
    this.isFalsePrescription = false ;
    this.isFalseNewAppointment = false;
    this.isFalseViewComplaint = false;
  }

  public viewAppointment(): void{
    this.isFalseEditProfile = false;
    this.isTrueViewProfile = false ;
    this.isFalseAppointment = true;
    this.isFalsePrescription = false ;
    this.isFalseViewComplaint = false;
    this.serviceDoctor.getDoctorAppointmentService(this.getLoggedId).subscribe(data => this.appointments = data);
  }
  logout(): void{
    this.router.navigate(['//logout']);
  }

  viewPrescriptionForm(id: any): void{
    this.isFalseAppointment = false ;
    this.isTrueViewProfile = false;
    this.isFalseEditProfile = false ;
    this.isFalsePrescription = true ;
    this.isFalseNewAppointment = false ;
    this.isFalseViewComplaint = false;
    this.serviceDoctor.getAppointmentService(id).subscribe(data => this.appointmentDetails = data);
  }
  prescription(): Subscription{
    return this.serviceDoctor.prescriptionService(this.appointmentDetails).subscribe(data => this.prescriptionMessage = data,
      error => console.log(error)) ;
  }

  viewComplaints(): Subscription {
    this.isFalseAppointment = false ;
    this.isTrueViewProfile = false;
    this.isFalseEditProfile = false ;
    this.isFalsePrescription = false ;
    this.isFalseNewAppointment = false ;
    this.isFalseViewComplaint = true;
    return this.serviceDoctor.getDoctorAppointmentService(this.getLoggedId).subscribe(data => this.appointments = data);
  }
}
