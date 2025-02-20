import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [FormsModule, CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.listCart().subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (error) => {
        console.error("Erro ao carregar o carrinho:", error);
      }
    });
  }
}
