import { Component, OnInit } from "@angular/core"
import { PaginationComponent } from "../../_component/pagination/pagination.component"
import { ProdutosService } from "../../service/produtos.service"
import { AsyncPipe, CurrencyPipe, NgClass, NgFor } from "@angular/common";
import { CategoriasService } from "../../service/categoria.service";
import { map, Observable } from "rxjs";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [PaginationComponent, NgFor, NgClass, CurrencyPipe, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  produtos: { id: number; nome: string; preco: number; avaliacao: number; imagem: string; idCateg: number }[] = []
  categorias$!: Observable<{ id: number; nome: string; desc: string }[]>
  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
  ) {}
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

  ngOnInit(): void {
    this.produtos = this.produtosService.getProdutos();
    this.categorias$ = this.categoriasService.getCategorias()
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => rating - i);
  }

  getCategoryName(idCateg: number): Observable<string> {
      return this.categorias$.pipe(
        map((categorias) => {
          const categoria = categorias.find((cat) => cat.id === idCateg)
          return categoria ? categoria.nome : "Categoria não encontrada"
        }),
      )
    }
}

