import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../_components/pagination/pagination.component';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProdutoComponent } from '../produto/produto.component';
import { ProdutosService } from '../../services/produtos.service';
 
@Component({
  selector: 'app-shop',
  imports: [ PaginationComponent, NgFor, NgClass, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
}) 
export class ShopComponent implements OnInit {
  produtos: { id: number; nome: string; preco: number; avaliacao: number; imagem: string; }[] = [];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.produtos = this.produtosService.getProdutos();
  }

  itemsPerPage = 15; // Quantos produtos por página
  currentPage = 1;  // Página inicial

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
    console.log(`Página atual: ${page}`);
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => rating - i);
  }
}
