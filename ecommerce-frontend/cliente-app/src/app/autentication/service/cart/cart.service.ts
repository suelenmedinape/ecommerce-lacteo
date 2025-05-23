import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = "/cart";

  constructor(private http: HttpClient, private headersService: HeadersService) { }

  addItemToCart(productId: number, quantity: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }, { headers }).pipe(
      catchError((error) => {
        if (error.error && error.error.message) {
          return throwError(() => new Error(error.error.message));
        } else {
          return throwError(() => new Error('Ocorreu um erro ao processar a compra'));
        }
      })
    );
  }

  listItemsInCart(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers }).pipe(
      catchError((error) => {
        if (error.error && error.error.message) {
          return throwError(() => new Error(error.error.message));
        } else {
          return throwError(() => new Error('Ocorreu um erro ao processar a compra'));
        }
      })
    );
  }

  removeItemFromCart(productId: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers }).pipe(
      catchError((error) => {
        if (error.error && error.error.message) {
          return throwError(() => new Error(error.error.message));
        } else {
          return throwError(() => new Error('Ocorreu um erro ao processar a compra'));
        }
      })
    );
  }

  buyItemsInCart(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/buy`, {}, { headers }).pipe(
      catchError((error) => {
        if (error.error && error.error.message) {
          return throwError(() => new Error(error.error.message));
        } else {
          return throwError(() => new Error('Ocorreu um erro ao processar a compra'));
        }
      })
    );
  }

  updateCartItemQuantity(productId: number, quantity: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update`, { productId, quantity }, { headers }).pipe(
      catchError((error) => {
        if (error.error && error.error.message) {
          return throwError(() => new Error(error.error.message));
        } else {
          return throwError(() => new Error('Ocorreu um erro ao processar a compra'));
        }
      })
    );
  }
}
