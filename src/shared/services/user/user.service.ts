import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDTO} from '../../dialogs/signup-dialog/signup-dialog.component';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TOKEN_NAME} from '../auth/auth.constants';
import {Router} from '@angular/router';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken: string = null;
  isAdmin: false;
  username: string;
  userFullName: string;
  user: any;
  gravatarProfileImg: string;
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(accessToken: string) {
    const decodedToken = this.jwtHelperService.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'admin');
    this.username = decodedToken.user_name;
    this.gravatarProfileImg = 'https://www.gravatar.com/avatar/' + crypto.MD5(this.username).toString();
    this.getUserByEmail(this.username).subscribe(
      (rsp: any) => {
        this.user = rsp;
        this.userFullName = rsp.firstName + ' ' + rsp.lastName;
      }
    );
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);

    this.router.navigate(['library']);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    this.username = null;
    this.userFullName = null;
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['']);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }

  signup(userDTO: UserDTO) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.bookdb_api_url + 'user', userDTO, {headers, responseType: 'text'});
  }

  getUserByEmail(email: string) {
    return this.http.get(environment.bookdb_api_url + 'user/email/' + email);
  }
}
