import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  LoginMode = true;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.LoginMode = !this.LoginMode;
  }

 

      onSubmit(form: NgForm){
      const email = form.value.email;
      const password = form.value.password;
      console.log(email);
      console.log(password);

      let authObs: Observable<AuthResponseData>;

      if (this.LoginMode){
        authObs = this.authService.login(email,password)
  
      }
      else{
        authObs = this.authService.signup(email, password)
      };

      authObs.subscribe(
        resData => {
          console.log(resData);
          this.router.navigate(['/recipes']);
        },
        error => {
          console.log(error);
        } );
      
      form.reset();
  }


  
}
