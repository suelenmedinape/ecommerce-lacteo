import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, CommonModule, RouterModule],
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

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => rating - i);
  }
}
