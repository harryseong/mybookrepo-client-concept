import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource, Sort} from '@angular/material';
import {Book} from '../view-books.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {ApiService} from '../../../../shared/services/api/api.service';
import {BookDTO} from '../lookup-books/lookup-books.component';

@Component({
  selector: 'app-view-books-table',
  templateUrl: './view-books-table.component.html',
  styleUrls: ['./view-books-table.component.scss'],
  animations: [
    trigger('bookTableAnimations', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(1em)'}),
        animate('0.5s ease'),
      ])
    ])
  ]
})
export class ViewBooksTableComponent implements OnInit {
  displayedColumns: string[] = ['cover', 'title', 'authors', 'categories'];
  dataSource: MatTableDataSource<any>;
  @Input()
  books: Book[];

  constructor(private apiService: ApiService, private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.books);

    // Set custom filter predicate for searching nested fields of organization objects.
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.applyFilter('');
  }

  openDialog(bookDTO: BookDTO): void {
    this.dialogService.openBookDetailsDialog(bookDTO, 'VIEW');
  }

  sortData(sort: Sort) {
    const data = this.books.slice();
    if (!sort.active || sort.direction === '') {
      this.books = data;
      return;
    }

    this.books = data.sort((a: Book, b: Book) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.books);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

}
