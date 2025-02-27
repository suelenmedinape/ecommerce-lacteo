import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../autentication/service/cart/cart.service';
import { Cart } from '../../../autentication/interface/cart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCart();
  }

  cart: Cart[] = [];

  listCart() {
    this.cartService.listItemsInCart().subscribe(
      (response) => {
        console.log(response);
        this.cart = response; 
      },
      (error) => {
        console.error('Erro ao buscar detalhes do carrinho:', error);
      }
    );
  }

  removeItem(productId: number) {
    this.cartService.removeItemFromCart(productId).subscribe(
      (response) => {
        console.log(response);
        this.listCart();
        console.log('Item removido do carrinho com sucesso!');
      },
      (error) => {
        console.error('Erro ao remover item do carrinho:', error);
      }
    );
  }

  buyItems() {
    this.cartService.buyItemsInCart().subscribe(
      (response) => {
        console.log(response);
        this.listCart();
        console.log('Compra realizada com sucesso!');
      },
      (error) => {
        console.error('Erro ao realizar compra:', error);
      }
    );
  }
}
