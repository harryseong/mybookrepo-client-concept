import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../../services/api/api.service';
import {BookDTO} from '../../../app/user-library/view-books/add-book/add-book.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
              private apiService: ApiService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addBook(bookDTO: BookDTO) {
    this.apiService.addBookToLibrary(bookDTO).subscribe(rsp => {
      console.log(rsp);
      this.apiService.bookAddedToLibrary(bookDTO);
      this.closeDialog();
    }, error1 => {
      console.error(error1);
    });
  }

  removeBook(book) {
    this.apiService.removeBookFromLibrary(book.id, '1').subscribe(
      rsp => {
        console.log(rsp);
        this.apiService.bookRemovedFromLibrary(book);
        this.router.navigate(['/library/books']);
        this.closeDialog();
      },
      err => console.error(err)
    );
  }

  abbreviateDescription = (description: string) => {
    return description.substr(0, 200).trim() + '.....';
  }
}
