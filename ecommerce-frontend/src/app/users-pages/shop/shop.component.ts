import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { map, Observable } from 'rxjs';

import { PaginationComponent } from '../../_component/pagination/pagination.component';
import { CategoriasService } from '../../service/categoria.service';
import { ProdutoService } from '../../service/produtos.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [PaginationComponent, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('cartButton') cartButton!: ElementRef;
  @ViewChild('categButton') categButton!: ElementRef;

  produtos: { id: number; productName: string; price: number }[] = [];
  categorias$!: Observable<{ id: number; nome: string; desc: string }[]>;

  itemsPerPage = 16; // Quantos produtos por página
  currentPage = 1; // Página inicial
  isMenuOpen = false;

  constructor(
    private produtosService: ProdutoService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.getProduto();
    this.categorias$ = this.categoriasService.getCategorias();
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Atualiza a página atual (chamado pelo componente de paginação)
  onPageChange(page: number): void {
    this.currentPage = page; // Atualiza a página atual
  }

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => rating - i);
  }

  getProduto(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      },
    });
  }

  getCategoryName(idCateg: number): Observable<string> {
    return this.categorias$.pipe(
      map((categorias) => {
        const categoria = categorias.find((cat) => cat.id === idCateg);
        return categoria ? categoria.nome : 'Categoria não encontrada';
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.cartButton) {
        this.cartButton.nativeElement.click();
      }
      if (this.categButton) {
        this.categButton.nativeElement.click();
      }
    }, 0);
  } // Executa após a renderização do Angular
}
