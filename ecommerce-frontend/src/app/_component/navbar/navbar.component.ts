import { Component, Input, OnInit } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UserType } from '../../Models/user-types.enum';

import { CategoriasService } from '../../service/categoria.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  @Input() userType: UserType = UserType.CLIENTE
  UserType = UserType
  isMenuOpen = false

  categoriasLimitadas: { id: number; nome: string; desc: string }[] = []

  constructor(public darkModeService: DarkModeService, private categoriasService: CategoriasService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  ngOnInit(): void {
    this.categoriasService
      .getCategorias()
      .pipe(take(1))
      .subscribe((categorias) => {
        this.categoriasLimitadas = categorias.slice(0, 100)
      })
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
