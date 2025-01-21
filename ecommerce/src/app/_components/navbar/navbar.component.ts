import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public navbarService: NavbarService) {}

  isDropdownOpen = false;
  isMobileMenuOpen = false;

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdownCateg(event: Event): void {
    event.preventDefault(); // Previne comportamentos padrão
    this.isDropdownOpen = !this.isDropdownOpen; // Alterna a visibilidade do dropdown
  }
}

/* ISSO SERA COLOCADO NO LOGIN.TS
export class LoginComponent implements OnInit {
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.hide();
  }
}
*/
