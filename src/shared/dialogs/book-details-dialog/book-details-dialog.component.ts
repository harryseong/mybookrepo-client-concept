import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {BookDTO} from '../../../app/user-library/view-books/lookup-books/lookup-books.component';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
              private apiService: ApiService,
              private router: Router, public userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addBook(bookDTO: BookDTO) {
    this.apiService.addBookToLibrary(bookDTO, this.userService.user.id).subscribe(rsp => {
      console.log(rsp);
      this.apiService.bookAddedToLibrary(bookDTO);
      this.closeDialog();
    }, error1 => {
      console.error(error1);
    });
  }

  removeBook(book) {
    this.apiService.removeBookFromLibrary(book.id, this.userService.user.id).subscribe(
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
