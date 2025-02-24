import { Component, HostListener, OnInit } from '@angular/core';
import { ProdutoService } from '../../autentication/service/produto/produto.service';
import { PaginationComponent } from "../../shared/_component/pagination/pagination.component";
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PaginationComponent, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isDropdownOpen = false;
  produtos: { id: number; productName: string; price: number; quantity: number; description: string }[] = [];

  itemsPerPage = 20; // Quantos produtos por página
  currentPage = 1; // Página inicial
  isMenuOpen = false;

  constructor(
    private produtosService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.listProducts();
  }

  // Total de páginas calculado com base no número de produtos
  get totalPages() {
    return Math.ceil(this.produtos.length / this.itemsPerPage);
  }

  // Filtra os produtos de acordo com a página atual
  get paginatedProdutos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.produtos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Atualiza a página atual (chamado pelo componente de paginação)
  onPageChange(page: number): void {
    this.currentPage = page; // Atualiza a página atual
  }

  toggleDropdown3() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  listProducts(): void {
      this.produtosService.getProdutos().subscribe({
        next: (dados) => {
          
          this.produtos = dados;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos:', err);
        },
      });
  }
}
