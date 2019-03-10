import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  $openSidenavEvent = new Subject<any>();

  constructor() { }

  openSidenav() {
    this.$openSidenavEvent.next();
  }
}
