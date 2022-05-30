import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User | undefined;

  errorMessage!: string;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appComponent: AppComponent,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  async login() {
    const user = await this.authService.authenticateUser(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    );

    if (user !== null) {
      this.appComponent.isLoggedIn = true;
    } else {
      alert('A felhasználónév vagy jelszó nem megfelelő!');
      this.loginForm.controls['username'].setValue(null);
      this.loginForm.controls['password'].setValue(null);
    }

    if (this.appComponent.isLoggedIn) {
      this.router.navigateByUrl('/car-list');
    }
  }

  async navigatetoSignUp() {
    this.router.navigate(['/user-form']);
  }
}
