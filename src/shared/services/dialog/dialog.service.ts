import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {BookDetailsDialogComponent} from '../../dialogs/book-details-dialog/book-details-dialog.component';
import {BookDTO} from '../../../app/user-library/view-books/lookup-books/lookup-books.component';
import {SignupDialogComponent} from '../../dialogs/signup-dialog/signup-dialog.component';
import {LoginDialogComponent} from '../../dialogs/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openBookDetailsDialog(bookDTO: BookDTO, dialogType: string) {
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      width: '40em',
      autoFocus: false,
      panelClass: 'book-details-dialog',
      data: {
        book: bookDTO,
        type: dialogType
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The book details dialog was closed');
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '35em',
      autoFocus: false,
      panelClass: 'login-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The log in dialog was closed');
    });
  }

  openSignupDialog() {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '40em',
      autoFocus: false,
      panelClass: 'signup-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The sign up dialog was closed');
    });
  }
}
