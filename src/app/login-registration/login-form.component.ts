import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';

import {LoginRegistrationService} from './login-registration.service';
import {CommonhttpServices} from '../lib/commonhttp.services';

export class LoginUser {
  public email: string;
  public password: string;
  public rememberMe: string;
}

export class RegisterUser {
  public email: string;
  public password: string;
  public username: string;
}

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  providers: [CommonhttpServices, LoginRegistrationService]
})

export class LoginFormComponent implements OnInit {
  showLogin: boolean = true;
  /** Define user */
  loginUser: LoginUser;
  registerUser: RegisterUser;

  constructor(private router: Router, private http: Http, private commonhttpServices: CommonhttpServices,
              private formBuilder: FormBuilder, private route: ActivatedRoute,
              private loginRegistrationService: LoginRegistrationService) {

  }

  ngOnInit() {
    this.loginUser = new LoginUser();
    this.registerUser = new RegisterUser();
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/music-record']);
    }
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('splash');
  }

  /**
   * Performs the login functionality by using the available service method and acts accordingly
   */
  public login(): void {
    console.log(this.loginUser.email);
    console.log(this.loginUser.password);
    this.loginRegistrationService.getLoginCredential(this.loginUser.email, this.loginUser.password);
  }

  /**
   * Performs the registration functionality by using service methods
   */
  public register(): void {
    this.loginRegistrationService.getRegistrationCredential(this.registerUser.username,
      this.registerUser.email, this.registerUser.password);
  }

  public switchPage(): void {
    this.showLogin = !this.showLogin;
  }
}
