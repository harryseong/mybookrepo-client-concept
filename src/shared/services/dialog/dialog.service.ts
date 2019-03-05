import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {BookDetailsDialogComponent} from '../../dialogs/book-details-dialog/book-details-dialog.component';
import {BookDTO} from '../../../app/user-library/view-books/add-book/add-book.component';

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
      console.log('The dialog was closed');
    });
  }
}
