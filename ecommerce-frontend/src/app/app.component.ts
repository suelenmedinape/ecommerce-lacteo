import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'login';
  showNavbar = true; // Controla a visibilidade do navbar

  // Método para ocultar o navbar
  hideNavbar(): void {
    this.showNavbar = false;
  }

  // Método para exibir o navbar
  showNavbarAgain(): void {
    this.showNavbar = true;
  }
}


