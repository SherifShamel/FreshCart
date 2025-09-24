import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthServiceService } from '../../../../shared/services/Auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _Router = inject(Router);

  forgotPassword: boolean = true;
  resetCode: boolean = false;
  newPassword: boolean = false;

  forgetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{3,20}$/)]],
  });

  forgetPassword() {
    this._AuthServiceService.forgetPassword(this.forgetPasswordForm.value.email).subscribe({
      next: (res) => {
        console.log(res);

        console.log(this.forgetPasswordForm.value.email);
        this.forgotPassword = false;
        this.resetCode = true;
      },
      error: (err) => {
        console.log(err);

        console.log(this.forgetPasswordForm.value.email);
      },
    });
    // console.log(this.forgetPasswordForm.value.email);
  }
  verifyResetCode() {
    this._AuthServiceService.verifyResetCode(this.resetCodeForm.value.resetCode).subscribe({
      next: (res) => {
        console.log(res);

        this.resetCode = false;
        this.newPassword = true;
      },
      error: (err) => {
        console.log(err);
        console.log(this.forgetPasswordForm.value.email);
      },
    });
    // console.log(this.forgetPasswordForm.value.email);
  }
  resetPassword() {
    this._AuthServiceService
      .resetPassword(this.resetPasswordForm.value.email, this.resetPasswordForm.value.newPassword)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
