import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/auth';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role || null; // Trata role ausente
        this.setUserRole(role);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        this.setToken(response.token);
        const decodedToken: any = jwtDecode(response.token); // manter o login mesmo mudando de guia
        this.setUserRole(decodedToken.role);
      }),
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        this.setToken(response.token);
        const decodedToken: any = jwtDecode(response.token); // manter o login mesmo mudando de guia
        this.setUserRole(decodedToken.role);
      }),
      catchError((error) => {
        const errorMessage = error?.error?.message || 'Erro desconhecido no registro.';
        console.error('Erro ao registrar usuário:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout() {
    this.cookieService.delete('auth_token', '/'); // Adicione o path '/'
    this.userRoleSubject.next(null);
  }

  getToken(): string | null {
    return this.cookieService.get('auth_token') || null;
  }

  private setToken(token: string) {
    this.cookieService.set('auth_token', token, 7, '/', undefined, true, 'Strict');
  } // duara 7 dias o token

  private setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
  }
}