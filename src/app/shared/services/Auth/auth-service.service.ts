import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userInfo: any;
  private readonly _HttpClient = inject(HttpClient);
  private readonly _CookieService = inject(CookieService);

  signUp(registerData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, registerData);
  }

  signIn(loginData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, loginData);
  }

  forgetPassword(email: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, {
      email: email,
    });
  }
  verifyResetCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, {
      resetCode: resetCode,
    });
  }
  resetPassword(email: string, password: string): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, {
      email: email,
      newPassword: password,
    });
  }

  decodeToken() {
    this.userInfo = jwtDecode(this._CookieService.get('token'));
  }
}
