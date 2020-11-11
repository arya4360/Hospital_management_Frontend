import { Component, OnInit } from '@angular/core';
import {PatientRegistrationService} from '../patient-registration.service';
import { Router} from '@angular/router';
import {DoctorService} from '../doctor.service';
import {Appointment} from '../appointment';
import {AppointmentPatient} from '../appointmentPatient';
import {AppointmentDoctor} from '../appointmentDoctor';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private service: PatientRegistrationService, private router: Router , private doctorService: DoctorService, private datePipe: DatePipe) { }
  public isfalse = false ;
  isFalseViewProfile = false ;
  isFalseAppointment = false;
  isFalseCreateAppointment = false;
  isFalseWriteComplaint = false ;
  id: any;
  doctorId: any;
  message: any ;
  complaintMessage: any;
  deleteAppointmentMessage: any ;
  public updatedDetails: any ;
  public viewDetails: any;
  public appointmentDetails: any = [];
  public allDoctors: any = [];
  getAppointmentById: any ;
  public popoverTitle = 'Please Confirm' ;
  public popoverMessage = 'Are you sure you want to logout ?' ;
  public cancelClicked = false;
  description: any;
  appointmentMessage: any;
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  appointmentDate: Date;

  ngOnInit(): void {
    this.service.getLoggedId.subscribe(loginId => this.id = loginId);  // getting logged in Id saved by service method during signing in
    this.doctorService.getAllDoctorsService().subscribe(data => this.allDoctors = data);
  }

  public updateDetailsPatient(): void{                                                // update patients details method
    const response = this.service.updatePatient(this.updatedDetails);
    response.subscribe(data => this.message = data);
  }
         // when patient click on edit button then other things will hide and update form will shown
  editProfileClicked(): void{
    this.service.getPatient(this.id).subscribe(dataobj => this.updatedDetails = dataobj);
    this.isfalse = true ;
    this.isFalseViewProfile = false;
    this.isFalseAppointment = false;
    this.isFalseCreateAppointment = false;
    this.isFalseWriteComplaint = false ;
  }
  // tslint:disable-next-line:typedef
  logout(){
    this.router.navigate(['//logout']);
  }

  viewProfile(): void{
    const res = this.service.getPatient(this.id);
    res.subscribe(dataobj => this.viewDetails = dataobj);
    this.isFalseViewProfile = true ;
    this.isfalse = false;
    this.isFalseAppointment = false ;
    this.isFalseCreateAppointment = false;
    this.isFalseWriteComplaint = false ;
  }

  viewAppointment(): void{
    this.isfalse = false ;
    this.isFalseViewProfile = false;
    this.isFalseAppointment = true ;
    this.isFalseCreateAppointment = false ;
    this.isFalseWriteComplaint = false ;
    this.service.appointmentService(this.id).subscribe(data => this.appointmentDetails = data);
  }
  viewCreateAppointment(): void{
    this.isFalseAppointment = false;
    this.isFalseViewProfile = false;
    this.isfalse = false ;
    this.isFalseCreateAppointment = true;
    this.isFalseWriteComplaint = false ;
  }

  public doAppointment(value: any): Subscription{
    let createAppointmentDetails ;
    let patient: AppointmentPatient ;
    let doctor: AppointmentDoctor ;
    patient = new AppointmentPatient(this.id);
    doctor = new AppointmentDoctor(this.doctorId) ;
    createAppointmentDetails = new Appointment(this.description , patient, doctor , this.appointmentDate);
    this.isFalseCreateAppointment = false;
    return this.service.createAppointmentService(createAppointmentDetails).subscribe(data => this.appointmentMessage = data,
      error => console.log(error)) ;
  }

  public deleteAppointment(id: any): Subscription{
    return this.service.deleteAppointmentService(id).subscribe(data => this.deleteAppointmentMessage = data , error => console.log(error));
  }

  viewWriteComplaint(idAppointment: any): void{         // when make complaint button is clicked
    this.isFalseAppointment = false;
    this.isFalseViewProfile = false;
    this.isfalse = false ;
    this.isFalseCreateAppointment = false;
    this.isFalseWriteComplaint = true ;
    this.doctorService.getAppointmentService(idAppointment).subscribe(data => this.getAppointmentById = data) ;
  }
  writeComplaint(): Subscription {
    return this.service.complaintService(this.getAppointmentById).subscribe(data => this.complaintMessage = data) ;
  }
}
