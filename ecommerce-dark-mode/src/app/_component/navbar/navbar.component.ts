import { Component, Input } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UserType } from '../../Models/user-types.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  @Input() userType: UserType = UserType.CLIENTE
  UserType = UserType
  isMenuOpen = false

  constructor(public darkModeService: DarkModeService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  /*// TODO: Implementar lógica de logout
  logout() {
    console.log("Logout clicked")
    // Aqui você implementará a lógica de logout quando integrar com o backend
  }*/
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
