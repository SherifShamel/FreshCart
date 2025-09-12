import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthServiceService } from '../../../shared/services/Auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _AuthServiceService: AuthServiceService,
    private _Router: Router,
    private _CookieService: CookieService // private _FormBuilder: FormBuilder
  ) {}
  private readonly _FormBuilder = inject(FormBuilder);

  // loginForm = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,10}$/)]),
  // });

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{3,20}$/)]],
  });

  userToken!: string;

  login() {
    if (this.loginForm.valid) {
      this._AuthServiceService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this._CookieService.set('token', res.token);
            this._AuthServiceService.decodeToken();
            //programming routing
            this._Router.navigate(['/home']);
          }
          // this._AuthServiceService.decodeToken()
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('not valid');
    }
  }
}
