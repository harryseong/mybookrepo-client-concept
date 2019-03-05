import { Component } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('backgroundAnimations', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1s .5s ease'),
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Domestic Books';
}
