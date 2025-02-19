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

  private userInfoSubject = new BehaviorSubject<any | null>(null);
  userInfo$ = this.userInfoSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role || null;
        this.setUserRole(role);
        this.fetchUserInfo(); // Busca as informações do usuário ao inicializar
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  fetchUserInfo(): void {
    const token = this.getToken();
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    this.http.get<any>(`/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).subscribe({
      next: (response) => {
        this.userInfoSubject.next(response); // Atualiza as informações do usuário
      },
      error: (error) => {
        console.error('Erro ao buscar perfil do usuário:', error);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          const decodedToken: any = jwtDecode(response.token);
          this.setUserRole(decodedToken.role);
          this.fetchUserInfo();
        } else {
          console.error('No token received in the response');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }
  
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          const decodedToken: any = jwtDecode(response.token);
          this.setUserRole(decodedToken.role);
          this.fetchUserInfo();
        } else {
          console.error('No token received in the response');
        }
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.cookieService.delete('auth_token', '/'); // Adicione o path '/'
    this.userRoleSubject.next(null);
    this.userInfoSubject.next(null);
  }

  getToken(): string | null {
    return this.cookieService.get('auth_token') || null;
  }

  userLogged(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('Token não encontrado');
      return throwError(() => new Error('Usuário não autenticado'));
    }

    return this.http.get<any>(`/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }).pipe(
      tap((response) => {
        // Processar a resposta conforme necessário
      }),
      catchError((error) => {
        console.error('Erro ao buscar perfil do usuário:', error);
        return throwError(() => error);
      })
    );
  }

  private setToken(token: string) {
    this.cookieService.set('auth_token', token, 7, '/', undefined, true, 'Strict');
  } // durara 7 dias o token

  private setUserRole(role: string | null) {
    this.userRoleSubject.next(role);
  }
}