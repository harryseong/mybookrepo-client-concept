import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {ErrorStateMatcher} from '@angular/material/typings/esm5/core';
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class SubscribeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  credsInvalid = false;
  serverIssue = false;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.resetErrors();
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(username, password).subscribe(
      (rsp: any) => {
        this.closeDialog();
        this.userService.login(rsp.access_token);
      },
      error => {
        console.error(error);
        if (error.error.error === 'invalid_grant') {
          this.credsInvalid = true;
        } else if (error.ok === false) {
          this.serverIssue = true;
        }
      }
    );
  }

  resetErrors() {
    this.credsInvalid = false;
    this.serverIssue = false;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
