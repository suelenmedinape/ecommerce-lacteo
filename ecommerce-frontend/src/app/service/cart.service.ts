import { Injectable } from "@angular/core"
import type { Observable } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { CookieService } from "ngx-cookie-service"
import { get } from "http"

@Injectable({
  providedIn: "root",
})
export class CartService {
  private apiUrl = "/cart"

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no addToCart:", token)
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }, { headers })
  }

  listCart(): Observable<any> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}`, { headers })
  }
}

