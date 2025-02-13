import { CurrencyPipe } from "@angular/common"
import { Component, Input } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-card-products",
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: "./card-products.component.html",
  styleUrl: "./card-products.component.css",
})
export class CardProductsComponent {
  @Input() variavel!: any[]
  @Input() lista: any[] = []
}

