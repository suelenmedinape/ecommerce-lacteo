import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { Subscription, take } from 'rxjs';

import { DarkModeService } from '../../service/dark-mode.service';
import { CategoriasService } from '../../service/categoria.service';
import { ProdutoService } from '../../service/produtos.service';

import { UserType } from '../../Models/user-types.enum';
import { AlertComponent } from '../alert/alert.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterModule, AlertComponent],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css' 
})

export class NavbarComponent implements OnInit {
  @ViewChild('cartButton') cartButton!: ElementRef; // Referência ao botão de carrinho
  @ViewChild('categButton') categButton!: ElementRef; // Referência ao botão de categorias

  categoriasLimitadas: { id: number; nome: string; desc: string }[] = []; //dropdown de categorias

  searchTerm: string = ''; // Termo de busca
  produtos: any[] = []; // Produtos encontrados
  isSearching: boolean = false; // Indica se está buscando produtos
  showAlert: boolean = false; // Variável para controlar a exibição do alerta
  UserType = UserType // Enum de tipos de usuário
  userRole: string | null = null
  private subscription: Subscription | null = null

  isMenuOpen = false // Indica se o menu está aberto

   constructor(
    public darkModeService: DarkModeService, 
    private categoriasService: CategoriasService, 
    private produtoService: ProdutoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCategMenu();
    this.subscription = this.authService.userRole$.subscribe((role: string | null) => {
      console.log('User role updated in NavbarComponent:', role); 
      this.userRole = role;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  logout() {
    this.authService.logout()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen // Alterna o estado do menu
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode(); // Alterna o modo escuro
  }

  getCategMenu(): void {
    this.categoriasService
      .getCategorias()
      .pipe(take(1))
      .subscribe((categorias) => {
        this.categoriasLimitadas = categorias.slice(0, 100)
      }); // Obtém as categorias
  }
  
  buscarProdutos(): void {
    if (this.searchTerm.trim() === '') { // Verifica se o termo de busca está vazio
      return;
    }
  
    this.getByNameProduct();
  }
  
  getByNameProduct(): void {
    this.produtoService.getProdutoByName(this.searchTerm).subscribe(
      (produtos) => {
        this.produtos = produtos;
        this.showAlert = produtos.length === 0; // Exibe alerta se nenhum produto for encontrado
        if (this.showAlert) {
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        }
      },
      // Exibe erro no console
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  // Executa após a renderização do Angular
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.cartButton) {
        this.cartButton.nativeElement.click();
      }
      if (this.categButton) {
        this.categButton.nativeElement.click();
      }
    }, 0);
  }// Para os dropdown sempre funcionarem 
}
