import { Component, type OnInit } from "@angular/core"
import { CurrencyPipe } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"
import type { Observable } from "rxjs"
import { map, take } from "rxjs/operators"
import { ProdutoService } from "../../service/produtos.service"
import { CategoriasService } from "../../service/categoria.service"
import { CardProductsComponent } from "../../_component/card-products/card-products.component"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, CardProductsComponent],
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
    this.getProduto()
    this.categorias$ = this.categoriasService.getCategorias()
    this.getCategLimit()
  }

  getProduto(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados.slice(0, 4) // Pegando apenas os 4 primeiros produtos
      },
      error: (err) => {
        console.error("Erro ao buscar produtos:", err)
      },
    })
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