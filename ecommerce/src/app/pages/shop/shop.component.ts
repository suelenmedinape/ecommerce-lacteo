import { Component } from '@angular/core';
import { PaginationComponent } from '../../_components/pagination/pagination.component';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [ PaginationComponent, NgFor, NgClass, CurrencyPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  produtos = [
    { id: 1, nome: "Queijo", preco: 15.00, avaliacao: 4.5, imagem: '/1.png' },
    { id: 2, nome: "Iogurte", preco: 25.00, avaliacao: 4.0, imagem: '/2.png' },
    { id: 3, nome: "Leite", preco: 35.00, avaliacao: 3.5, imagem: '/3.png' },
    { id: 4, nome: "Manteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 4, nome: "Manteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 1, nome: "Qufeseijo", preco: 15.00, avaliacao: 4.5, imagem: '/1.png' },
    { id: 2, nome: "s", preco: 25.00, avaliacao: 4.0, imagem: '/2.png' },
    { id: 3, nome: "fesf", preco: 35.00, avaliacao: 3.5, imagem: '/3.png' },
    { id: 4, nome: "efs", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 4, nome: "fs", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 1, nome: "Queijo", preco: 15.00, avaliacao: 4.5, imagem: '/1.png' },
    { id: 2, nome: "sfv", preco: 25.00, avaliacao: 4.0, imagem: '/2.png' },
    { id: 3, nome: "Leite", preco: 35.00, avaliacao: 3.5, imagem: '/3.png' },
    { id: 4, nome: "Mavsevsteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 4, nome: "Manteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 1, nome: "Quevsevijo", preco: 15.00, avaliacao: 4.5, imagem: '/1.png' },
    { id: 2, nome: "vesvs", preco: 25.00, avaliacao: 4.0, imagem: '/2.png' },
    { id: 3, nome: "Leite", preco: 35.00, avaliacao: 3.5, imagem: '/3.png' },
    { id: 4, nome: "Manvsevsvsteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 4, nome: "Manvfsfeteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
  ];

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
