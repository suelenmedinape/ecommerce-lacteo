import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = "/cart";

  constructor(private http: HttpClient, private headersService: HeadersService) {}

  addItemToCart(productId: number, quantity: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }, { headers });
  }

  listItemsInCart(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  removeItemFromCart(productId: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }

  buyItemsInCart(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/buy`, {}, { headers });
  }

  updateCartItemQuantity(productId: number, quantity: number): Observable<any> {
    const url = `${this.apiUrl}/update`;
    const body = { productId, quantity };
    const headers = this.headersService.getAuthHeaders();

    return this.http.put(url, body, { headers }).pipe(
      map(response => {
        console.log('Response from server:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error in updateCartItemQuantity:', error);
        throw error;
      })
    );
  }
}
