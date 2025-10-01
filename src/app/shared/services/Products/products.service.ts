import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient);

  getAllProducts(pageNumber: number = 1, categoryId?: string, brandId?: string): Observable<any> {
    if (categoryId) {
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${pageNumber}`, {
        params: {
          'category[in]': `${categoryId}`,
        },
      });
    } else if (brandId) {
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${pageNumber}`, {
        params: {
          brand: `${brandId}`,
        },
      });
    } else {
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${pageNumber}`);
    }
  }

  getSpecificProduct(p_id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${p_id}`);
  }
}
