import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private readonly _HttpClient = inject(HttpClient);

  getLoggeduserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  addProductToCart(p_id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, { productId: p_id });
  }

  updateCartProductQuantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`, {
      count: count,
    });
  }

  removeSpeceficCartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`);
  }
}
