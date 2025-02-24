import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = '/products'; 

  constructor(private http: HttpClient, private cookieService: CookieService) {}
 
  getProdutos(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  addProduct(product: any): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no addProduct:", token);
    return this.http.post(this.apiUrl, product, {headers});
  }
}
