import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProdutosService } from "../../services/produtos.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-produto",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./produto.component.html",
  styleUrls: ["./produto.component.css"],
  providers: [ProdutosService],
})
export class ProdutoComponent implements OnInit {
  produto: any;
  quantity = 5;
  minQuantity = 1;
  maxQuantity = 50;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.produto = this.produtosService.getProdutoById(id);

    if (!this.produto) {
      console.error("Produto não encontrado para o ID:", id);
    }
  }

  getStars(avaliacao: number): number[] {
    return Array.from({ length: 5 }, (_, index) =>
      index < Math.round(avaliacao) ? 1 : 0
    );
  }

  increment(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decrement(): void {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
    }
  }

  validateQuantity(): void {
    const parsedQuantity = Number.parseInt(this.quantity.toString(), 10);
    if (isNaN(parsedQuantity)) {
      this.quantity = this.minQuantity;
    } else {
      this.quantity = Math.max(
        this.minQuantity,
        Math.min(parsedQuantity, this.maxQuantity)
      );
    }
  }
}
