import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../view-books.component';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {BookDTO} from '../add-book/add-book.component';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-books-cards',
  templateUrl: './view-books-cards.component.html',
  styleUrls: ['./view-books-cards.component.scss'],
  animations: [
    trigger('bookCardAnimations', [
      transition(':enter', [
        query('.book-card', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(100, [
            sequence([
              animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ]),
        ])
      ]),
    ])
  ]
})
export class ViewBooksCardsComponent implements OnInit {
  @Input()
  books: Book[];

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  public abbreviateTitle = (title: string) => {
    return title.length > 60 ? title.substr(0, 60).trim() + '.....' : title;
  }

  public abbreviateDescription = (description: string) => {
    return description.length > 180 ? description.substr(0, 180).trim() + '.....' : description;
  }

  openDialog(bookDTO: BookDTO): void {
    this.dialogService.openBookDetailsDialog(bookDTO, 'VIEW');
  }
}
