import { NgFor, NgClass, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  produtos = [
    { id: 1, nome: "Queijo", preco: 15.00, avaliacao: 4.5, imagem: '/1.png' },
    { id: 2, nome: "Iogurte", preco: 25.00, avaliacao: 4.0, imagem: '/2.png' },
    { id: 3, nome: "Leite", preco: 35.00, avaliacao: 3.5, imagem: '/3.png' },
    { id: 4, nome: "Manteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
    { id: 4, nome: "Manteiga", preco: 45.00, avaliacao: 3.0, imagem: '/4.png' },
  ];

  categorias = [
    { id: 1, nome: "Queijo", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { id: 2, nome: "Iogurte", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    { id: 3, nome: "Leite", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  ];

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => rating - i);
  }
}