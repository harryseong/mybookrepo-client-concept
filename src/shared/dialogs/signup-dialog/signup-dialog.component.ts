import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/typings/esm5/core';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

export interface UserDTO {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class SubscribeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {
  matcher: SubscribeErrorStateMatcher; // For form error matching.
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<SignupDialogComponent>, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  checkUserInDB() {
    this.userService.getUserByEmail(this.signupForm.get('email').value).subscribe(
      rsp => {
        if (rsp != null) {
          this.signupForm.get('email').setErrors({accountAlreadyExists: true});
          console.warn('Account already exists.');
        }
      }
    );
  }

  verifyPassword() {
    const form = this.signupForm.value;
    if (this.signupForm.get('password').touched && this.signupForm.get('passwordConfirm').touched &&
      form.password !== form.passwordConfirm) {
      this.signupForm.get('password').setErrors({passwordsDoNotMatch: true});
      this.signupForm.get('passwordConfirm').setErrors({passwordsDoNotMatch: true});
      console.warn('The passwords do not match.');
    } else if (this.signupForm.get('password').touched && this.signupForm.get('passwordConfirm').touched &&
      form.password === form.passwordConfirm) {
       if (form.password.length === 0) {
         this.signupForm.get('password').setErrors({required: true});
         this.signupForm.get('passwordConfirm').setErrors({required: true});
       } else {
         this.signupForm.get('password').setErrors(null);
         this.signupForm.get('passwordConfirm').setErrors(null);
       }
    }
  }

  signup() {
    const form = this.signupForm.value;
    const userDTO: UserDTO = {
      firstName: form.firstName,
      middleName: '',
      lastName: form.lastName,
      email: form.email,
      password: form.password
    };

    this.userService.signup(userDTO).subscribe(
      rsp => {
        console.log(rsp);
        this.signupForm.reset();
        this.login(userDTO.email, userDTO.password);
      },
      error1 => console.error(error1));
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (rsp: any) => {
        this.closeDialog();
        this.userService.login(rsp.access_token);
      },
      error => {
        console.error(error);
      }
    );
  }
}
