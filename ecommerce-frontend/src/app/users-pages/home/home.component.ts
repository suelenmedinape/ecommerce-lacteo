import { AsyncPipe, NgClass, CurrencyPipe } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router"
import { Component, type OnInit } from "@angular/core"

import { map, type Observable, take } from "rxjs"

import { ProdutoService } from "../../service/produtos.service"
import { CategoriasService } from "../../service/categoria.service"
import { get } from "http";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  produtos: { id: number; productName: string; price: number }[] = []
  
  categorias$!: Observable<{ id: number; nome: string; desc: string }[]>
  categoriasLimitadas: { id: number; nome: string; desc: string }[] = []

  constructor(
    private produtosService: ProdutoService,
    private categoriasService: CategoriasService,
  ) {}

  ngOnInit(): void {
    this.getProduto();
    this.categorias$ = this.categoriasService.getCategorias();
    this.getCategLimit();
  }

  getProduto(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados.slice(0, 4); // Pegando apenas os 4 primeiros produtos
      },
      error: (err) => {
        console.error("Erro ao buscar produtos:", err);
      },
    });
  }

  getCategLimit(): void {
    this.categoriasService
      .getCategorias()
      .pipe(take(1))
      .subscribe((categorias) => {
        this.categoriasLimitadas = categorias.slice(0, 3)
      })
  }

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => rating - i)
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