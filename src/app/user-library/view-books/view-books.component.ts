import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ApiService} from '../../../shared/services/api/api.service';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {SnackBarService} from '../../../shared/services/snackBar/snack-bar.service';
import {Author} from '../view-authors/view-authors.component';
import {UserService} from '../../../shared/services/user/user.service';

export class Category {
  id: number;
  name: string;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

export class Book {
  private id: number;
  public title: string;
  private authors: Author[];
  public categories: Category[];
  private description: string;
  private isbn10: string;
  private isbn13: string;
  private otherIdType: string;
  private pageCount: string;
  private printType: string;
  private publishedDate: number;
  private publisher: string;
  private coverImageURL: string;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.authors = data.authors;
    this.categories = data.categories;
    this.description = data.description;
    this.isbn10 = data.isbn10;
    this.isbn13 = data.isbn13;
    this.otherIdType = data.otherIdType;
    this.pageCount = data.pageCount;
    this.printType = data.printType;
    this.publisher = data.publisher;
    this.publishedDate = data.publishedDate;
    this.coverImageURL = data.coverImageURL;
  }
}

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit, OnDestroy {
  $allBooks: Subscription;
  $bookRemovedFromLibrary: Subscription;
  books: Book[] = [];
  isLoading = true;
  isGrid = true;

  constructor(private apiService: ApiService, private dialogService: DialogService, private snackBarService: SnackBarService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.getMyLibraryBooks();
    this.$bookRemovedFromLibrary = this.apiService.$bookRemovedEvent.subscribe(book => {
      this.getMyLibraryBooks();
      this.snackBarService.openSnackBar('"' + book.title + '" removed from library.', 'OK');
    });
  }

  ngOnDestroy(): void {
    this.$allBooks.unsubscribe();
  }

  updateBooksDisplayStyle(isGrid: boolean) {
    this.isGrid = isGrid;
  }

  getMyLibraryBooks() {
    this.books = [];
    this.$allBooks = this.apiService.getAllBooks(this.userService.user.id).subscribe(
      rsp => {
        rsp.map(book => {
          this.books.push(new Book(book));
        });
        this.isLoading = false;
      }
    );
  }
}
