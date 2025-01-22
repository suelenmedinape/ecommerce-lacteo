import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, RouterLink, RouterLinkActive, NgIf, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  showNavbar: boolean = true;

  categorias: { id: number; nome: string; desc: string; }[] = [];
  isDropdownOpen = false;

  constructor(public navbarService: NavbarService, private categoriasService: CategoriasService) { }

  isMobileMenuOpen = false;
  //teste de login e logout
  isLoggedIn: boolean = false; // Variável que controla o estado de autenticação

  ngOnInit(): void {
    this.login(); // Simula um login automático
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdownCateg(event: Event): void {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Métodos para simular login e logout
  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
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
