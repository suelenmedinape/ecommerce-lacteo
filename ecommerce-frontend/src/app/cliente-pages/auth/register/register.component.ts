import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../_component/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent { 
  name = "";
  email = "";
  password = "";
  showAlert: boolean = false;
  errorMessage: string = "";  // <- Adicionei esta variável

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(["/"]);
        console.log("Registro bem-sucedido!");
      },
      error: (error) => {
        console.error("Falha no registro:", error.message);
        
        this.errorMessage = error.message; // <- Captura a mensagem do backend
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
    });
  }
}
