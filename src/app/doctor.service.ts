import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  getId: Observable<any> ;
  private subject = new Subject<any>();

  constructor(private http: HttpClient , private router: Router) {
    this.getId = this.subject.asObservable();
  }
  // tslint:disable-next-line:typedef
  setId(data: any){
    console.log(data);
    this.subject.next(data);
  }
  // tslint:disable-next-line:typedef
  public addDoctorService(doctor: any){
    return  this.http.post('http://localhost:8080/doctor/addDoctor', doctor, {responseType: 'text' as 'json'});
  }
  // tslint:disable-next-line:typedef
  public getDoctorService(id: any){
    return this.http.get('http://localhost:8080/doctor/' + id );
  }
  // tslint:disable-next-line:typedef
  public getAllDoctorsService(){
    return this.http.get('http://localhost:8080/doctor/getAllDoctors') ;
  }
  // tslint:disable-next-line:typedef
  public removeDoctorService(id: any){
    return this.http.get('http://localhost:8080/doctor/removeDoctor/' + id);
  }
  // tslint:disable-next-line:typedef
  public updateDoctorService(doctor){
    return this.http.put('http://localhost:8080/doctor/updateDetails/' + doctor.id , doctor , {responseType: 'text' as 'json'}) ;
  }
  // tslint:disable-next-line:typedef
  public loginDoctorService(doctor): Observable<any>{
    const response = this.http.post<any>('http://localhost:8080/doctor/loginDoctor', doctor , {responseType: 'text' as 'json'});
    this.router.navigate(['//doctor-dashboard']);
    return response ;
  }
  // tslint:disable-next-line:typedef
  public getDoctorAppointmentService(id: number){
    return this.http.get('http://localhost:8080/appointment/doctor/' + id) ;
  }
  // tslint:disable-next-line:typedef
  public prescriptionService(appointment){
    // tslint:disable-next-line:max-line-length
    return this.http.put('http://localhost:8080/appointment/prescription/' + appointment.id , appointment , {responseType: 'text' as 'json'});
  }
  // tslint:disable-next-line:typedef
  public getAppointmentService(id: any){
    return this.http.get('http://localhost:8080/appointment/' + id);
  }
}
