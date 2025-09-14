import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthServiceService } from '../Auth/auth-service.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _CookieService = inject(CookieService);

  getLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`, {
      headers: { token: this._CookieService.get('token') },
    });
  }
}
