import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http" // Remove 'type' from this import
import { type Observable, BehaviorSubject } from "rxjs"
import { switchMap, tap } from "rxjs/operators"
import { CookieService } from "ngx-cookie-service"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = "/auth"
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  private http = inject(HttpClient)
  private cookieService = inject(CookieService)

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        this.setToken(response.token); //cookie
        this.setUserRole(response.role); // Use a role da resposta
      }),
    );
  }

  logout() {
    this.cookieService.delete("auth_token") // Remove o cookie apagando o token
    this.userRoleSubject.next(null) // Remove a role do usuário
  }

  getToken(): string | null {
    return this.cookieService.get("auth_token") || null // recupera o token do cookie
  }

  private setToken(token: string) {
    this.cookieService.set("auth_token", token, 7, "/", undefined, true, "Strict")
  }
  /* ´|`
  "auth_token" → Nome do cookie.
  token → Valor do token.
  7 → Expiração de 7 dias.
  "/" → Cookie acessível em toda a aplicação.
  undefined → Domínio (não definido, usa o domínio atual).
  true → secure (somente HTTPS).
  "Strict" → SameSite (evita envio do cookie em requisições de terceiros).
  */

  // atualiza os componentes que dependem da role do usuário dizendo que a role mudou se é admin, clinete ou null = visitante
  private setUserRole(role: string) {
    console.log('Setting user role:', role); // Log para depuração
    this.userRoleSubject.next(role);
  }
}

