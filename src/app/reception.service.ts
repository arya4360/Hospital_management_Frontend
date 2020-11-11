import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  viewAllAppointments(){
    return this.http.get('http://localhost:8080/appointment/allAppointments') ;
  }
  // tslint:disable-next-line:typedef
  deleteAppointmentService(id: any){
    return this.http.get('http://localhost:8080/appointment/delete/' + id) ;
  }
  // tslint:disable-next-line:typedef
  pendingAppointmentService(){
    return this.http.get('http://localhost:8080/appointment/pending') ;
  }
  complaintForwardService(id: any): Observable<any>{
    return this.http.get('http://localhost:8080/appointment/complaint/forward/' + id) ;
  }
}

