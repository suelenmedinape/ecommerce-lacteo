import { Component, Input, OnInit } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UserType } from '../../Models/user-types.enum';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../service/categoria.service';
import { take } from 'rxjs';
import { ProdutoService } from '../../service/produtos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchTerm: string = ''; 
  produtos: any[] = [];
  isSearching: boolean = false;

  @Input() userType: UserType = UserType.CLIENTE
  UserType = UserType
  isMenuOpen = false

  categoriasLimitadas: { id: number; nome: string; desc: string }[] = []

  constructor(
    public darkModeService: DarkModeService, 
    private categoriasService: CategoriasService, 
    private produtoService: ProdutoService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  ngOnInit(): void {
    this.categoriasService
      .getCategorias()
      .pipe(take(1))
      .subscribe((categorias) => {
        this.categoriasLimitadas = categorias.slice(0, 100)
      });
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  buscarProdutos(): void {
    if (this.searchTerm.trim() === '') {
      this.produtos = [];
      return;
    }

    this.isSearching = true;
    this.produtoService.getProdutoByName(this.searchTerm).subscribe(
      (produtos) => {
        this.produtos = produtos;
        this.isSearching = false;
        console.log('Produtos encontrados:', this.produtos);
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
        this.isSearching = false;
        this.produtos = [];
      }
    );
  }
}