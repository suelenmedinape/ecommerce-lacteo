import { Component } from '@angular/core';
import { ProdutosService } from '../../service/produtos.service';
import { NgFor, NgClass, CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgClass, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  produtos: { id: number; nome: string; preco: number; avaliacao: number; imagem: string; }[] = [];
  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.produtos = this.produtosService.getProdutos().slice(0, 4);
  }
  
  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => rating - i);
  }
}
