import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { HeadersService } from '../token/headers.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = '/products'; 

  constructor(private http: HttpClient, private headerService: HeadersService) {}
 
  getProdutos(): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/info-product-admin`, {headers}).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    ); 
  }

  deleteProduct(id: number): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    console.log('id', id);
    return this.http.delete(`${this.apiUrl}/${id}`, {headers}).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    );
  } 

  addProduct(product: any): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.post(this.apiUrl, product, {headers}).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    );
  }

  getProdutoByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?name=${name}`).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    );
  }

  editProduct(product: any): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${product.id}`, product, {headers}).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    );
  }

  getProductById(id: number): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, {headers}).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    );
  }

  getCategories(): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/list-categories`, {headers}).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    ); 
  }

  listByCategory(category: string): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/list?category=${encodeURIComponent(category)}`, { headers }).pipe(
      catchError((error) => {
          return throwError(() => new Error(error.error.message));
      })
    );
  }
}
