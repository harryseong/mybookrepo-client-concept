import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(username, password).subscribe(
      (rsp: any) => this.userService.login(rsp.access_token)
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
