import { CurrencyPipe } from "@angular/common"
import { Component, Input } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { CartService } from "../../service/cart.service"
import { AlertComponent } from "../alert/alert.component"

@Component({
    selector: "app-card-products",
    standalone: true,
    imports: [CurrencyPipe, RouterLink, RouterLinkActive, AlertComponent],
    templateUrl: "./card-products.component.html",
    styleUrl: "./card-products.component.css",
})
export class CardProductsComponent {
    @Input() variavel!: any[]
    @Input() lista: any[] = []
    prod: any
    errorMessage = ""
    showAlert: boolean = false;
    categAlert: number = 0;
    message: string = "";

    constructor(private cartService: CartService) { }

    addToCart(productId: number, quantity: number): void {
        if (quantity <= 0) {
            this.errorMessage = "Quantidade inválida.";
            return;
        }

        this.cartService.addToCart(productId, quantity).subscribe({
            next: () => {
                this.showAlert = true;
                this.categAlert = 3;
                this.message = "Produto adicionado ao carrinho!";
            },
            error: (error) => {
                if (error.status === 401) {
                    this.errorMessage = "Faça login para adicionar itens ao carrinho.";
                    this.showAlert = true;
                    this.categAlert = 4;
                    this.message = "Erro ao realizar a compra!";
                } else {
                    this.errorMessage = "Erro ao adicionar produto.";
                    this.showAlert = true;
                    this.categAlert = 2;
                    this.message = "Erro ao adicionar produto.";
                }
            }
        });
    }
}

