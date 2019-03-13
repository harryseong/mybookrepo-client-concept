import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {UserService} from '../../../shared/services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private dialogService: DialogService, public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  openLoginDialog() {
    if (this.userService.accessToken !== null) {
      this.router.navigate(['library']);
    } else {
      this.dialogService.openLoginDialog();
    }
  }

  openSignupDialog() {
    this.dialogService.openSignupDialog();
  }

}
