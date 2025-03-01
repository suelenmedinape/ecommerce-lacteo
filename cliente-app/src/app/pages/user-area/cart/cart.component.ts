import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../autentication/service/cart/cart.service';
import { Cart } from '../../../autentication/interface/cart';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [AlertComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCart()
  }

  cart: Cart[] = []
  showAlert = false
  categAlert = 0
  message = ""
  errorMessage = ""

  listCart() {
    this.cartService.listItemsInCart().subscribe(
      (response) => {
        console.log(response)
        this.cart = response
      },
      (error) => {
        console.error("Erro ao buscar detalhes do carrinho:", error)
        this.showError("Erro ao buscar detalhes do carrinho")
      },
    )
  }

  removeItem(productId: number) {
    this.cartService.removeItemFromCart(productId).subscribe(
      (response) => {
        console.log(response)
        this.cart = this.cart.filter((card) => card.id !== productId)
        console.log("Item removido do carrinho com sucesso!")
        this.showSuccess("Item removido do carrinho com sucesso!")
      },
      (error) => {
        console.error("Erro ao remover item do carrinho:", error)
        this.showError("Erro ao remover item do carrinho")
      },
    )
  }

  buyItems() {
    this.cartService.buyItemsInCart().subscribe(
      (response) => {
        console.log(response)
        this.listCart()
        console.log("Compra realizada com sucesso!")
        this.showSuccess("Compra realizada com sucesso!")
      },
      (error) => {
        console.error("Erro ao realizar compra:", error)
        this.showError("Erro ao realizar compra")
      },
    )
  }

  private showSuccess(message: string) {
    this.showAlert = true
    this.categAlert = 3
    this.message = message
  }

  private showError(message: string) {
    this.showAlert = true
    this.categAlert = 2
    this.errorMessage = message
    this.message = message
  }

  increaseQuantity(item: any) {
    const newQuantity = item.quantity + 1;
    this.updateQuantity(item.product.id, newQuantity);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.updateQuantity(item.product.id, newQuantity);
    }
  }

  updateQuantity(productId: number, newQuantity: number) {
    newQuantity = Math.max(1, Math.floor(Number(newQuantity)));

    this.cartService.updateCartItemQuantity(productId, newQuantity).subscribe({
      next: (response) => {
        this.listCart();
        if (response && response.cart) {
          this.cart = response.cart;
        } else {
          const item = this.cart.find(i => i.product.id === productId);
          if (item) {
            item.quantity = newQuantity;
          }
        }
      },
      error: (error) => {
        this.showAlert = true
        this.categAlert = 2
        this.message = "Quantidade Indisponível"
        this.listCart();
      }
    });
  }

  calculateTotalPrice(): number {
      return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

}