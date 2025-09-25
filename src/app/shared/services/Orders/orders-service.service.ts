import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersServiceService {
  private readonly _HttpClient = inject(HttpClient);

  CheckoutSession(c_id: string, formData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${c_id}/${environment.domain}`,
      { shippingAddress: formData }
    );
  }

  getUserOrders(user_id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${user_id}`);
  }
}
