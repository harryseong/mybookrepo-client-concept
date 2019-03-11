import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatSidenav} from '@angular/material';
import {SidenavService} from '../shared/services/sidenav/sidenav.service';
import {Subscription} from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'Domestic Books';
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  $openSidenavSubscription: Subscription;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.$openSidenavSubscription = this.sidenavService.$openSidenavEvent.subscribe(
      rsp => this.sidenav.open()
    );
  }

  ngOnDestroy(): void {
    this.$openSidenavSubscription.unsubscribe();
  }

  close(reason: string) {
    console.log('Sidenav closed via ' + reason);
    this.sidenav.close();
  }
}
