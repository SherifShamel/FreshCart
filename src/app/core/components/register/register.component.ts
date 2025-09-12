import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../../shared/services/Auth/auth-service.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private _AuthServiceService: AuthServiceService, private _Router: Router) {}

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{3,20}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{3,20}$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    this.comparePasswords
  );

  register(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this._AuthServiceService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('data are not correct, nice try');
    }
  }

  comparePasswords(fGroup: AbstractControl) {
    return fGroup.get('password')?.value === fGroup.get('rePassword')?.value
      ? null
      : { missMatch: true };
  }
}
