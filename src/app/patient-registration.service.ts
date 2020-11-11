import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {
  getLoggedId: Observable<any> ;
  private subject = new Subject<any>();
  constructor(private http: HttpClient , private router: Router) {
    this.getLoggedId = this.subject.asObservable();
  }
  // tslint:disable-next-line:typedef
  setLoggedId(data: any){
    console.log(data);
    this.subject.next(data);
  }

  // tslint:disable-next-line:typedef
  public doRegistration(patient){
    return this.http.post('http://localhost:8080/patient/addPatient', patient, {responseType: 'text'as 'json'}) ;
  }
  // tslint:disable-next-line:typedef
  public deletePatient(id: any){
    return this.http.get('http://localhost:8080/remove/' + id);
  }
  // tslint:disable-next-line:typedef
  public getPatient(id: any){
    return this.http.get('http://localhost:8080/getPatient/' + id ) ;
  }
  // tslint:disable-next-line:typedef
  public updatePatient( patient){
    return this.http.put('http://localhost:8080/patient/updateDetails/' + patient.id , patient , { responseType: 'text' as 'json'});
  }
  // tslint:disable-next-line:typedef
  public login(patientLoginData): Observable<any>{
    const res = this.http.post<any>('http://localhost:8080/loginPatient', patientLoginData , {responseType: 'text'as 'json'});
    this.router.navigate(['//patient-dashboard']);
    return res;
  }

  // tslint:disable-next-line:typedef
  public verifyPatientService(id: any){
    return this.http.get('http://localhost:8080/patient/verify/' + id );
  }

  // security login in patient login component
  public loginWithSecurity(patientLoginDetails): Observable<any>{
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(patientLoginDetails.username + ':' + patientLoginDetails.password)}).set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>('http://localhost:8080/rest/secure/getMsg');
  }
  // tslint:disable-next-line:typedef
  public appointmentService(id: number){
    return this.http.get('http://localhost:8080/appointment/patient/' + id);
  }
  // tslint:disable-next-line:typedef
  public getAllPatientService(){
    return this.http.get('http://localhost:8080/getAllPatients');
  }
  // tslint:disable-next-line:typedef
  public createAppointmentService(appointment){
    console.log(appointment);
    return this.http.post('http://localhost:8080/appointment/newAppointment', appointment , {responseType: 'text'as 'json'}) ;
  }
  // tslint:disable-next-line:typedef
  public deleteAppointmentService(id: any){
    return this.http.get('http://localhost:8080/appointment/delete/' + id) ;
  }

  // tslint:disable-next-line:typedef
  complaintService(appointment) {
    return this.http.put('http://localhost:8080/appointment/complaint/' + appointment.id , appointment, {responseType: 'text' as 'json'} );
  }
}
