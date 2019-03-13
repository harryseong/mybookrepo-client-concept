import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDTO} from '../../dialogs/signup-dialog/signup-dialog.component';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TOKEN_NAME} from '../auth/auth.constants';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken: string;
  isAdmin: boolean;
  userFullName: string;
  username: string;
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(accessToken: string) {
    const decodedToken = this.jwtHelperService.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'admin');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);

    this.router.navigate(['library']);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
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

  checkUserInDB(email: string) {
    return this.http.get(environment.bookdb_api_url + 'user/email/' + email);
  }
}
