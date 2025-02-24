import { Component, type OnInit } from "@angular/core"
import { CurrencyPipe } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { ProdutoService } from "../../service/produtos.service"
import { CartService } from "../../service/cart.service"
import { AlertComponent } from "../../_component/alert/alert.component"
 
@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.css"],
  imports: [CurrencyPipe, AlertComponent]
})
export class ProdutosComponent implements OnInit {
  produto: any
  errorMessage = ""
  showAlert: boolean = false;
  categAlert: number = 0;
  message: string = "";

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private cartService: CartService,
  ) { }

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
        this.showAlert = true;
        this.categAlert = 3;
        this.message = "Produto adicionado ao carrinho!";
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = "Faça login para adicionar itens ao carrinho.";
          this.showAlert = true;
          this.categAlert = 4;
          this.message = "Erro ao realizar a compra!";
        } else {
          this.errorMessage = "Erro ao adicionar produto.";
          this.showAlert = true;
          this.categAlert = 2;
          this.message = "Erro ao adicionar produto.";
        }
      }
    });
  }
}

