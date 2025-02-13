import type { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { AuthService } from "../service/auth.service"


// req - repesenta a requisição HTTP
// next - representa a função que chama o próximo interceptor ou o serviço HttpClient
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService) // usa o injector para obter a instância do serviço AuthService | impede a criaçao de um construtor
  const token = authService.getToken() 

  // se o token existir ele e adicionado na requisição
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return next(req)
}

