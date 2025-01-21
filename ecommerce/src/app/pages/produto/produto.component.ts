import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, CommonModule, RouterModule, FormsModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit {
  produto: any;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produto = this.produtosService.getProdutoById(id);
  
    if (!this.produto) {
      console.error('Produto não encontrado para o ID:', id);
    }
  }

  getStars(avaliacao: number): number[] {
    return Array.from({ length: 5 }, (_, index) => index < Math.round(avaliacao) ? 1 : 0);
  }

  quantity: number = 5; // Valor inicial
  minQuantity: number = 1; // Valor mínimo
  maxQuantity: number = 50; // Valor máximo

  // Incrementa o valor respeitando o máximo
  increment(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  // Decrementa o valor respeitando o mínimo
  decrement(): void {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
    }
  }

  // Valida o valor inserido manualmente
  validateQuantity(): void {
    if (this.quantity < this.minQuantity) {
      this.quantity = this.minQuantity;
    } else if (this.quantity > this.maxQuantity) {
      this.quantity = this.maxQuantity;
    }
  }
  
}
