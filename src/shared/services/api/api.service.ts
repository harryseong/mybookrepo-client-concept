import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Book} from '../../../app/user-library/view-books/view-books.component';
import {BookDTO} from '../../../app/user-library/view-books/lookup-books/lookup-books.component';
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME, TOKEN_NAME} from '../auth/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  $bookAddedEvent = new Subject<any>();
  $bookRemovedEvent = new Subject<any>();

  constructor(private http: HttpClient) { }

  bookAddedToLibrary(book: BookDTO) {
    this.$bookAddedEvent.next(book);
  }

  bookRemovedFromLibrary(book: Book) {
    this.$bookRemovedEvent.next(book);
  }

  // BookDB API Endpoints
  getAllAuthors(): Observable<any> {
    return this.http.get(environment.bookdb_api_url + 'author/');
  }

  getAuthor(authorId: number): Observable<any> {
    return this.http.get(environment.bookdb_api_url + 'author/' + authorId);
  }

  getAllBooks(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME)
      })
    };
    return this.http.get(environment.bookdb_api_url + 'book/', httpOptions);
  }

  getBook(bookId: number): Observable<any> {
    return this.http.get(environment.bookdb_api_url + 'book/' + bookId);
  }

  addBookToLibrary(bookDTO: BookDTO) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME),
    });
    return this.http.post(environment.bookdb_api_url + 'library/book/', bookDTO, {headers, responseType: 'text'});
  }

  removeBookFromLibrary(bookId: string, userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME)
    });
    const params = new HttpParams().set('bookId', bookId).set('userId', userId);
    return this.http.delete(environment.bookdb_api_url + 'library/book/', {params, headers, responseType: 'text'});
  }

  // Google Books API Endpoints
  lookupBooksByTitle(title: string) {
    return this.http.get(environment.google_api_url + '?q=title:' + title);
  }
  lookupBooksByAuthor(author: string) {
    return this.http.get(environment.google_api_url + '?q=author:' + author);
  }
  lookupBooksByIsbn13(isbn13: string) {
    return this.http.get(environment.google_api_url + '?q=isbn:' + isbn13);
  }
}
