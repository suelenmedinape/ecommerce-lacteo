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

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(["/login"]);
        console.log("Registro bem-sucedido!");
      },
      error: (error) => {
        console.error("Registration failed:", error);
        // Display an error message to the user
        alert("Registration failed. Please try again.");
      }  
    }); 
  }
}
