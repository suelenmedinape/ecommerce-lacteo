import { Component } from "@angular/core"

import { FormsModule } from "@angular/forms"
import { Router, RouterLink, RouterLinkActive } from "@angular/router"
import { inject } from "@angular/core"
import { AuthService } from "../../../service/auth.service"
import { AlertComponent } from "../../../_component/alert/alert.component"
import { NavbarService } from "../../../service/navbar.service"
  
@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, AlertComponent, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = ""
  password = ""
  showAlert: boolean = false

  private authService = inject(AuthService)
  private router = inject(Router)
  private navbarService = inject(NavbarService)

  ngOnInit() {
    this.navbarService.hide()
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {  
        this.router.navigate(["/"])
        this.navbarService.show()
        console.log("Login successful:")
      },
      error: (error) => {
        console.error("Login failed:", error);
        this.showAlert = true;
      },      
    })
  }
}

