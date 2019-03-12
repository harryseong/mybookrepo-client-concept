import { Injectable } from '@angular/core';
import {UserDTO} from '../../dialogs/signup-dialog/signup-dialog.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BookDTO} from '../../../app/user-library/view-books/lookup-books/lookup-books.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  signup(userDTO: UserDTO) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.bookdb_api_url + 'user', userDTO, {headers, responseType: 'text'});
  }

  checkUserInDB(email: string) {
    return this.http.get(environment.bookdb_api_url + 'user/email/' + email);
  }
}
