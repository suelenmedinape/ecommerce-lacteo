import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../autentication/service/cart/cart.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../../autentication/interface/cart/cart';

@Component({
  selector: 'app-cart',
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = []
  cartTotal = 0
  errorMessage: string | null = null
  isLoading = false

  private cartService = inject(CartService)

  ngOnInit(): void {
    this.loadCartItems()
  }

  loadCartItems(): void {
    this.isLoading = true
    this.errorMessage = null

    this.cartService.listItemsInCart().subscribe({
      next: (items) => {
        this.cartItems = items
        this.calculateCartTotal()
        this.isLoading = false
      },
      error: (err) => {
        console.error("Error loading cart items:", err)
        this.errorMessage = "Failed to load cart items. Please try again."
        this.isLoading = false
      },
    })
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + item.totalPrice, 0)
  }

  increaseQuantity(itemId: number): void {
    const item = this.cartItems.find((i) => i.id === itemId)
    if (item) {
      // Check if we're already at max quantity
      if (item.quantity < item.product.quantity) {
        this.updateItemQuantity(itemId, item.quantity + 1)
      } else {
        this.errorMessage = "Maximum available quantity reached"
        setTimeout(() => (this.errorMessage = null), 3000)
      }
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find((i) => i.id === itemId)
    if (item && item.quantity > 1) {
      this.updateItemQuantity(itemId, item.quantity - 1)
    }
  }

  updateItemQuantity(itemId: number, newQuantity: number): void {
    this.isLoading = true;
    this.errorMessage = null;
  
    this.cartService.updateCartItemQuantity(itemId, newQuantity).subscribe({
      next: () => {
        this.loadCartItems();
      },
      error: (err) => {
        this.isLoading = false;
        
        // Log para ver o formato do erro
        console.error("Erro completo:", err);
  
        const errorMessage = typeof err.error === "string" ? err.error : err.error?.message;
        
        if (errorMessage === "Quantidade Indisponível") {
          this.errorMessage = "Quantidade não disponível em estoque";
  
          // Reset UI para o valor correto
          const item = this.cartItems.find((i) => i.id === itemId);
          if (item) {
            item.quantity = Math.min(item.quantity, item.product.quantity);
          }
        } else {
          this.errorMessage = "Erro ao atualizar o carrinho. Tente novamente.";
        }
  
        // Auto-dismiss error após 3s
        setTimeout(() => (this.errorMessage = null), 3000);
      },
    });
  }
  

  removeItem(itemId: number): void {
    this.isLoading = true
    this.errorMessage = null

    this.cartService.removeItemFromCart(itemId).subscribe({
      next: () => {
        this.loadCartItems()
      },
      error: (err) => {
        console.error("Error removing item from cart:", err)
        this.errorMessage = "Failed to remove item. Please try again."
        this.isLoading = false

        // Auto-dismiss error after 3 seconds
        setTimeout(() => (this.errorMessage = null), 3000)
      },
    })
  }

  buyItems(): void {
    if (this.cartItems.length === 0) {
      this.errorMessage = "Your cart is empty"
      setTimeout(() => (this.errorMessage = null), 3000)
      return
    }

    this.isLoading = true
    this.errorMessage = null

    this.cartService.buyItemsInCart().subscribe({
      next: (response) => {
        console.log("Purchase successful:", response)
        this.loadCartItems()
        // Show success message
        this.errorMessage = "Purchase successful!"
        setTimeout(() => (this.errorMessage = null), 3000)
      },
      error: (err) => {
        console.error("Error purchasing items:", err)
        this.errorMessage = "Failed to complete purchase. Please try again."
        this.isLoading = false

        // Auto-dismiss error after 3 seconds
        setTimeout(() => (this.errorMessage = null), 3000)
      },
    })
  }
}