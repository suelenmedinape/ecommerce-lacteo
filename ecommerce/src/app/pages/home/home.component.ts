import { NgFor, NgClass, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: { id: number; nome: string; preco: number; avaliacao: number; imagem: string; }[] = [];
  categorias: { id: number; nome: string; desc: string; }[] = []; 

  constructor(private produtosService: ProdutosService, private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.produtos = this.produtosService.getProdutos().slice(0, 5);
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data.slice(0, 3);
    });
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => rating - i);
  }
}