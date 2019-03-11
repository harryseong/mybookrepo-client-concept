import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api/api.service';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('transitionAnimations', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(0.5em)'}),
        animate('0.75s 0.5s ease'),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit() {}
}
