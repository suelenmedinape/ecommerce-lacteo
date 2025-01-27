import { Component, type OnInit } from "@angular/core"
import { AsyncPipe, NgFor, NgClass, CurrencyPipe } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { map, type Observable, take } from "rxjs"
import { ProdutosService } from "../../service/produtos.service"
import { CategoriasService } from "../../service/categoria.service"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NgFor, NgClass, CurrencyPipe, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  produtos: { id: number; nome: string; preco: number; avaliacao: number; imagem: string; idCateg: number }[] = []
  categorias$!: Observable<{ id: number; nome: string; desc: string }[]>
  categoriasLimitadas: { id: number; nome: string; desc: string }[] = []

  constructor(
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
  ) {}

  ngOnInit(): void {
    this.produtos = this.produtosService.getProdutos().slice(0, 4)
    this.categorias$ = this.categoriasService.getCategorias()
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

