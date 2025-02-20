import { Component, type OnInit } from "@angular/core"
import { CurrencyPipe } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { ProdutoService } from "../../service/produtos.service"
import { CartService } from "../../service/cart.service"

@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.css"],
  imports: [CurrencyPipe]
})
export class ProdutosComponent implements OnInit {
  produto: any
  errorMessage = ""

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.getproduct()
  }

  getproduct(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get("id"))
      this.produtoService.getProdutoById(id).subscribe({
        next: (produto) => {
          this.produto = produto
        },
        error: (err) => {
          this.produto = null
          this.errorMessage = "Erro ao carregar o produto."
        },
      })
    })
  }

  addToCart(productId: number, quantity: number): void {
    if (quantity <= 0) {
        this.errorMessage = "Quantidade inválida.";
        return;
    }
    
    this.cartService.addToCart(productId, quantity).subscribe({
        next: () => {
            alert('Produto adicionado ao carrinho!');
        },
        error: (error) => {
            if (error.status === 401) {
                this.errorMessage = "Faça login para adicionar itens ao carrinho.";
            } else {
                this.errorMessage = "Erro ao adicionar produto.";
            }
        }
    });
}
}

