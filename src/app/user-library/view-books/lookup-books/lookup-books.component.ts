import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../shared/services/api/api.service';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {SnackBarService} from '../../../../shared/services/snackBar/snack-bar.service';

export class AuthorDTO {
  private firstName: string;
  private middleName: string;
  private lastName: string;

  constructor(firstName, lastName?, middleName?) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }
}

export class BookDTO {
  private title: string;
  private publisher: string;
  private publishedDate: number;
  private description: string;
  private pageCount: number;
  private coverImageURL: string;
  private printType: string;
  private isbn10: string;
  private isbn13: string;
  private otherIdType: string;
  private authors: AuthorDTO[];
  private categories: CategoryDTO[];

  constructor(data: any) {
    this.title = data.title !== undefined ? data.title : null;
    this.publisher = data.publisher !== undefined ? data.publisher : null;
    this.publishedDate = data.publishedDate !== undefined ? this.formatPublishedDate(data.publishedDate) : null;
    this.description = data.description !== undefined ? data.description : null;
    this.pageCount = data.pageCount !== undefined ? data.pageCount : null;
    this.coverImageURL = data.imageLinks !== undefined ? data.imageLinks.thumbnail : null;
    this.printType = data.printType !== undefined ? data.printType : null;
    if (data.industryIdentifiers !== undefined) {
      this.isbn10 = this.formatIdentifier(data.industryIdentifiers, 'isbn10');
      this.isbn13 = this.formatIdentifier(data.industryIdentifiers, 'isbn13');
      this.otherIdType = this.formatIdentifier(data.industryIdentifiers, 'other');
    }
    this.authors = data.authors !== undefined ? this.addAuthors(data.authors) : null;
    this.categories = data.categories !== undefined ? this.addCategories(data.categories) : null;
  }

  formatPublishedDate(publishedDate): number {
    const pubDateArray = publishedDate.split('-');
    return pubDateArray[0];
  }

  formatIdentifier(industryIdentifiers, idType: string): string {
    let identifier = null;
    industryIdentifiers.map(industryIdentifier => {
      if (industryIdentifier.type === 'ISBN_13' && idType === 'isbn13') {
        identifier = industryIdentifier.identifier;
        console.log('ISBN 13 number found: ' + identifier);
      }
      if (industryIdentifier.type === 'ISBN_10' && idType === 'isbn10') {
        identifier = industryIdentifier.identifier;
        console.log('ISBN 10 number found: ' + identifier);
      }
      if (industryIdentifier.type === 'OTHER' && idType === 'other') {
        identifier = industryIdentifier.identifier;
        console.log('Other identifier type found: ' + identifier);
      }
    });
    return identifier;
  }

  addAuthors(authors: any): AuthorDTO[] {
    if (authors === undefined) {
      console.log('This book does not have listed authors.');
      return null;
    }
    const authorDTOArray: AuthorDTO[] = [];
    authors.map(author => {
      const nameArray = author.split(' ');
      let authorDTO: AuthorDTO;
      switch (nameArray.length) {
        case 3:
          authorDTO = new AuthorDTO(nameArray[0], nameArray[2], nameArray[1]);
          break;
        case 2:
          authorDTO = new AuthorDTO(nameArray[0], nameArray[1], null);
          break;
        case 1:
          authorDTO = new AuthorDTO(nameArray[0], null, null);
          break;
        default:
          authorDTO = new AuthorDTO(author, null, null);
      }
      console.log('AuthorDTO: ', authorDTO);
      authorDTOArray.push(authorDTO);
    });
    return authorDTOArray;
  }

  addCategories(categories: any): CategoryDTO[] {
    if (categories === undefined) {
      console.log('This book was not assigned any categories.');
      return null;
    }
    const categoryDTOArray: CategoryDTO[] = [];
    categories.map(category => {
      categoryDTOArray.push(new CategoryDTO(category));
    });
    return categoryDTOArray;
  }
}

export class CategoryDTO {
  private name: string;

  constructor(category: any) {
    this.name = category;
  }
}

@Component({
  selector: 'app-lookup-books',
  templateUrl: './lookup-books.component.html',
  styleUrls: ['./lookup-books.component.scss'],
  animations: [
    trigger('bookCardAnimations', [
      transition(':enter', [
        query('.book-card', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(100, [
            sequence([
              animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ])
        ], {optional: true})
      ]),
    ])
  ]
})
export class LookupBooksComponent implements OnInit, OnDestroy {
  $lookupBooks: Subscription;
  $bookAddedToLibrary: Subscription;
  lookupBookForm = new FormGroup({
    searchField: new FormControl('')
  });
  prevSearchTerm = '';
  bookSearched = false;
  bookDTOArray: BookDTO[] = [];
  isLoading = true;
  @ViewChild('searchField') searchFieldRef: ElementRef;

  constructor(private apiService: ApiService, private dialogService: DialogService, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.$bookAddedToLibrary = this.apiService.$bookAddedEvent.subscribe(bookDTO => {
      this.snackBarService.openSnackBar('"' + bookDTO.title + '" added to library.', 'OK');
    });
  }

  ngOnDestroy(): void {
    if (this.$lookupBooks != null) {
      this.$lookupBooks.unsubscribe();
    }

    if (this.$bookAddedToLibrary != null) {
      this.$bookAddedToLibrary.unsubscribe();
    }
  }

  lookupBooks() {
    this.bookDTOArray = [];
    this.bookSearched = true;
    this.isLoading = true;
    this.prevSearchTerm = this.lookupBookForm.get('searchField').value;
    this.searchFieldRef.nativeElement.blur();

    if (this.isISBN(this.prevSearchTerm)) {
      console.log('Search term identified as ISBN number');
      this.lookupBooksByISBN13(this.prevSearchTerm);
    } else {
      console.log('Search term not an ISBN number');
      this.lookupBooksByTitle(this.prevSearchTerm);
      this.lookupBooksByAuthor(this.prevSearchTerm);
    }
  }

  isISBN(searchTerms: string) {
    return /^(97(8|9))?\d{9}(\d|X)$/.test(searchTerms);
  }

  lookupBooksByTitle(searchTerms: string) {
    this.$lookupBooks = this.apiService.lookupBooksByTitle(searchTerms).subscribe(data => {
      this.processGoogleBooksApiResponse(data);
    });
  }

  lookupBooksByAuthor(searchTerms: string) {
    this.$lookupBooks = this.apiService.lookupBooksByAuthor(searchTerms).subscribe(data => {
      this.processGoogleBooksApiResponse(data);
    });
  }

  lookupBooksByISBN13(searchTerms: string) {
    this.$lookupBooks = this.apiService.lookupBooksByIsbn13(searchTerms).subscribe(data => {
      this.processGoogleBooksApiResponse(data);
    });
  }

  processGoogleBooksApiResponse(data: any) {
    const dataObj: any = data;
    const totalItems = dataObj.totalItems;
    if (totalItems > 0) {
      dataObj.items.slice(0, 10).map(item => {
        const bookDTO = new BookDTO(item.volumeInfo);
        console.log('BookDTO: ', bookDTO);
        this.bookDTOArray.push(bookDTO);
      });
      console.log('BookDTOArray: ', this.bookDTOArray);
      console.log(totalItems + ' book items returned from API call.');
    } else {
      console.log(totalItems + ' book items returned from API call.');
    }
    this.isLoading = false;
    this.clearSubscriptions();
    this.clearLookupBookForm();
  }

  clearSubscriptions() {
    if (this.$lookupBooks != null) {
      this.$lookupBooks.unsubscribe();
      this.$lookupBooks = null;
    }
  }

  clearLookupBookForm() {
    this.lookupBookForm.get('searchField').reset();
    this.lookupBookForm.clearValidators();
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'NEW');
  }

  public abbreviateTitle = (title: string) => {
    return title.length > 60 ? title.substr(0, 60).trim() + '.....' : title;
  }

  public abbreviateDescription = (description: string) => {
    return description.length > 180 ? description.substr(0, 180).trim() + '.....' : description;
  }
}
