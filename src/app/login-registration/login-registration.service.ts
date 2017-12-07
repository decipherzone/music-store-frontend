import {Headers, Http, RequestOptions} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/filter';
import {CommonhttpServices} from '../lib/commonhttp.services';
import {CustomType} from '../lib/custom-type';


@Injectable()
export class LoginRegistrationService {
  /**
   * url for the api for registration
   */
  urlregistration: string = 'auth/signup';
  /**
   * url for the api for login
   */
  tokenurllogin: string = 'auth/login';

  /**
   * Flag to check if user is logged in
   */
  isLogIn: boolean = false;
  /**
   * variable to hold email value of form
   */
  email: string;
  /**
   * variable to hold header value of form
   */

  header = new Headers({
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
  });

  options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  });

  /**
   * Public constructor which does all the initialization of instance variables
   * @param http
   */
  constructor(private commonhttpServices: CommonhttpServices, @Inject(Http) private http: Http, @Inject(Router) private router: Router) {
  }

  /**
   * Performs the login functionality by using api methods
   */
  getLoginCredential(loginEmail: any, loginPassword: any): void {
    let obj: CustomType = {};
    obj['email'] = loginEmail;
    obj['password'] = loginPassword;
    this.commonhttpServices.postJSON(this.tokenurllogin, obj).subscribe(response => {
      console.log(JSON.stringify(response));
      if (response.status === 'Success' && response.code === 200) {

        this.setIsLoggedIn(response['data']);
        this.router.navigate(['/music-record']);
      }
    });
  }

  /**
   * Performs the registration functionality by using api methods
   */
  getRegistrationCredential(registerUserName: any, registerEmail: any, registerPassword: any): void {
    let obj: CustomType = {};
    obj['name'] = registerUserName;
    obj['email'] = registerEmail;
    obj['password'] = registerPassword;
    this.commonhttpServices.postJSON(this.urlregistration, obj).subscribe(response => {
      console.log(JSON.stringify(response));
      if (response.status === 'success' && response.data.email === registerEmail) {
        this.router.navigate(['/music-record']);
      } else if (response.status === false) {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * method to Logout
   */
  logOut() {
    this.setIsLoggedOut();
    this.router.navigate(['/login']);
  }

  setIsLoggedIn(response: any) {
    sessionStorage.setItem('isLoggedIn', 'true');
    console.log(response);
    sessionStorage.setItem('userEmail', response.userDetails.email);
    sessionStorage.setItem('access_token', response.tokenInfo.accessToken);
  }

  setIsLoggedOut() {
    sessionStorage.clear();
  }

  isLoggedIn() {
    return this.isLogIn;
  }
}
