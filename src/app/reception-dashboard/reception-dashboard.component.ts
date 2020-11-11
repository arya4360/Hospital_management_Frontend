import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../doctor.service';
import {Registerdoctor} from '../registerdoctor';
import {PatientRegistrationService} from '../patient-registration.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ReceptionService} from '../reception.service';
import {AppointmentPatient} from '../appointmentPatient';
import {AppointmentDoctor} from '../appointmentDoctor';
import {Appointment} from '../appointment';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-reception-dashboard',
  templateUrl: './reception-dashboard.component.html',
  styleUrls: ['./reception-dashboard.component.css']
})
export class ReceptionDashboardComponent implements OnInit {
  public popoverTitle = 'Please Confirm' ;
  public popoverMessage = 'Are you sure you want to logout ?' ;
  public cancelClicked = false;
  confirmpassword: any;
  public popoverTitleverify = 'Please Confirm' ;
  public popoverMessageverify = 'Are you sure you want to verify this Patient ?' ;
  public registerDoctor = new Registerdoctor('', '', '', '', '');
  sucessmessage: any;
  isFalse = false;
  isFalseregister = false;
  isFalseViewPatient = false;
  isFalseViewPanel2 = true ;
  isFalseViewPanel1 = true;
  isFalseVerifyPatient = false;
  isFalseViewAllAppointment = false;
  isFalseViewComplaint = false;
  isFalseCreateAppointment = false;
  // messageVerified: any;
  idDoctor: any;
  idPatient: any;
  description: any ;
  makeAppointmentMessage: any;
  registerDoctorMessage: any;
  appointmentDate: Date;

  constructor( private serviceDoctor: DoctorService,
               private servicePatient: PatientRegistrationService,
               private serviceReception: ReceptionService,
               private http: HttpClient, private router: Router) { }

  allDoctors: any = [];
  patients: any = [];
  notVerifiedPatients: any = [];
  allAppointments: any = [] ;
  pendingAppointments: any = [] ;

  ngOnInit(): void {
    this.http.get('http://localhost:8080/getAllNotVerifiedPatients').subscribe(datares => this.notVerifiedPatients = datares);
    this.serviceDoctor.getAllDoctorsService().subscribe(data => this.allDoctors = data);
    this.http.get('http://localhost:8080/getAllPatients').subscribe(data => this.patients = data);
    this.serviceReception.pendingAppointmentService().subscribe(data => this.pendingAppointments = data) ;
    this.serviceReception.viewAllAppointments().subscribe(data => this.allAppointments = data) ;
  }

public getAllDoctors(): void{
    this.isFalse = true;
    const response = this.serviceDoctor.getAllDoctorsService();
    response.subscribe(data => this.allDoctors = data);
}
public deleteDoctor(id: any): void{
    const res = this.serviceDoctor.removeDoctorService(id) ;
    res.subscribe(data => this.allDoctors = data);
    // res.subscribe(data => this.notVerifiedPatients = data);
}

public addDoctor(): void{
    if (this.registerDoctor.password === this.confirmpassword){
      this.serviceDoctor.addDoctorService(this.registerDoctor).subscribe(data => this.registerDoctorMessage = data);
    }else {
      alert('password does not match');
    }
}

  public removePatient(id: number): void{
    const resp = this.servicePatient.deletePatient(id);
    resp.subscribe(resdata => this.patients = resdata);
  }

  public getAllVerifiedPatients(): void{
    this.isFalseViewPatient = true;
    const response = this.http.get('http://localhost:8080/getAllVerifiedPatients');
    response.subscribe(data => this.patients = data);
  }
  public  verifyPatient(id: number): void{
    this.servicePatient.verifyPatientService(id).subscribe(data => this.notVerifiedPatients = data) ;
  }
  public getNotVerifiedPatients(): Subscription{
    this.isFalseViewPanel1 = false;
    this.isFalseViewPanel2 = false;
    this.isFalseregister = false;
    this.isFalseVerifyPatient = true ;
    this.isFalseViewAllAppointment = false;
    this.isFalseViewComplaint = false;
    this.isFalseCreateAppointment = false;
    return  this.http.get('http://localhost:8080/getAllNotVerifiedPatients').subscribe(datares => this.notVerifiedPatients = datares);
  }

  logout(): void{
    this.router.navigate(['//logout']);
  }
  public viewRegisterForm(): void{
    this.isFalseViewPanel2 = false;
    this.isFalseViewPanel1 = false;
    this.isFalseVerifyPatient = false;
    this.isFalseregister = true ;
    this.isFalseViewAllAppointment = false;
    this.isFalseViewComplaint = false;
    this.isFalseCreateAppointment = false;
  }

  public dashboard(): void{
    this.isFalseViewPanel1 = true;
    this.isFalseViewPanel2 = true;
    this.isFalseregister = false;
    this.isFalseVerifyPatient = false;
    this.isFalseViewAllAppointment = false;
    this.isFalseViewComplaint = false;
    this.isFalseCreateAppointment = false;
  }

  viewAllAppointments(): Subscription{
    this.isFalseViewPanel1 = false;
    this.isFalseViewPanel2 = false;
    this.isFalseregister = false;
    this.isFalseVerifyPatient = false;
    this.isFalseViewAllAppointment = true;
    this.isFalseViewComplaint = false;
    this.isFalseCreateAppointment = false;
    return  this.serviceReception.viewAllAppointments().subscribe(data => this.allAppointments = data) ;
  }
  deleteAppointment(id: any): Subscription{
    this.serviceReception.pendingAppointmentService().subscribe(data => this.pendingAppointments = data) ;
    return this.serviceReception.deleteAppointmentService(id).subscribe(data => this.allAppointments = data) ;
  }
  viewComplaint(): void{
    this.isFalseViewPanel1 = false;
    this.isFalseViewPanel2 = false;
    this.isFalseregister = false;
    this.isFalseVerifyPatient = false;
    this.isFalseViewAllAppointment = false;
    this.isFalseViewComplaint = true;
    this.isFalseCreateAppointment = false;
    this.serviceReception.viewAllAppointments().subscribe(data => this.allAppointments = data) ;
  }

  viewMakeAppointment(): void{
    this.isFalseViewPanel1 = false;
    this.isFalseViewPanel2 = false;
    this.isFalseregister = false;
    this.isFalseVerifyPatient = false;
    this.isFalseViewAllAppointment = false;
    this.isFalseViewComplaint = false;
    this.isFalseCreateAppointment = true;
    this.http.get('http://localhost:8080/getAllVerifiedPatients').subscribe(data => this.patients = data) ;
    this.serviceDoctor.getAllDoctorsService().subscribe(data => this.allDoctors = data) ;
    this.serviceReception.pendingAppointmentService().subscribe(data => this.pendingAppointments = data) ;
  }

  public makeAppointment(): Subscription{
    const patient: AppointmentPatient = new AppointmentPatient(this.idPatient) ;
    const doctor: AppointmentDoctor = new AppointmentDoctor(this.idDoctor) ;
    const appointment: Appointment = new Appointment(this.description, patient, doctor, this.appointmentDate) ;
    return this.servicePatient.createAppointmentService(appointment).subscribe(data => this.makeAppointmentMessage = data) ;
  }
  public complaintForward(id): Subscription{
    return this.serviceReception.complaintForwardService(id).subscribe(data => this.allAppointments = data);
  }
}
