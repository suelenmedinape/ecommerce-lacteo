import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { inject } from "@angular/core"
import { AuthService } from "../../../service/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input type="email" [(ngModel)]="email" name="email" required>
      <input type="password" [(ngModel)]="password" name="password" required>
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  email = ""
  password = ""

  private authService = inject(AuthService)
  private router = inject(Router)

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(["/"])
        console.log("Login successful:")
      },
      error: (error) => {
        console.error("Login failed:", error)
      },
    })
  }
}

