import { Component } from "@angular/core"

import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { inject } from "@angular/core"
import { AuthService } from "../../../service/auth.service"
import { AlertComponent } from "../../../_component/alert/alert.component"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = ""
  password = ""
  showAlert: boolean = false

  private authService = inject(AuthService)
  private router = inject(Router)

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {  
        this.router.navigate(["/"])
        console.log("Login successful:")
      },
      error: (error) => {
        console.error("Login failed:", error);
        this.showAlert = true; 
        if (this.showAlert) {
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
          
        }
      },      
    })
  }
}

