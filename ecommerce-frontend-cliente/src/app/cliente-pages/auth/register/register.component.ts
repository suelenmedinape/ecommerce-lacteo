import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../_component/alert/alert.component';
import { NavbarService } from '../../../service/navbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent { 
  name = "";
  email = "";
  password = "";

  private authService = inject(AuthService);
  private router = inject(Router);
  private navbarService = inject(NavbarService);

  ngOnInit() {
    this.navbarService.hide();
  }

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        console.log("Registro bem-sucedido!");
        alert("Registro concluído com sucesso! Fazendo login automaticamente...");
  
        // Realiza login automaticamente após o registro
        this.authService.login(this.email, this.password).subscribe({
          next: (response) => {
            console.log("Login automático bem-sucedido!");
            this.router.navigate(["/"]); // Redireciona para a página principal
            this.navbarService.show();
          },
          error: (loginError) => {
            console.error("Falha no login automático:", loginError);
            alert("O registro foi concluído, mas houve um erro ao fazer login. Por favor, faça login manualmente.");
            this.router.navigate(["/login"]); // Redireciona para a página de login
          }
        });
      },
      error: (error) => {
        console.error("Falha no registro:", error);
        alert("Falha no registro. Por favor, tente novamente.");
      }
    });
  } 
}
