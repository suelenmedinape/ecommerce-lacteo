import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-products',
  imports: [],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css'
})
export class CardProductsComponent {

  @Input() variavel: string = 'Valor padrão';
  @Input() lista: string = 'Valor padrão';
}
