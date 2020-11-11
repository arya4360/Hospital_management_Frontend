import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthGuardService} from '../service/auth-guard.service';

@Component({
  selector: 'app-reception-login',
  templateUrl: './reception-login.component.html',
  styleUrls: ['./reception-login.component.css']
})
export class ReceptionLoginComponent implements OnInit {
  receptionusername: any;
  receptionpassword: any;
  constructor(private router: Router, private authService: AuthGuardService) { }

  ngOnInit(): void {
  }
  // hard-coded the reception login

  receptionLogin(): void{
    if ((this.receptionusername === 'reception' && this.receptionpassword === 'reception') ||
      (this.receptionusername === 'admin' && this.receptionpassword === 'admin')){
      this.authService.userLoggedIn = true ;            // routeGuard permission to route the dashboard page
      this.router.navigate(['//reception-dashboard']);
    }else {
      alert('wrong username or password');
      this.authService.userLoggedIn = false ;
    }
  }

}
