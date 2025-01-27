import { Component } from '@angular/core';
import { PaginationComponent } from '../../_component/pagination/pagination.component';

@Component({
  selector: 'app-shop',
  imports: [PaginationComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  totalPages = 20; // Exemplo de total de páginas

  onPageChange(page: number) {
    console.log('Página selecionada:', page);
    // Adicione lógica para carregar os dados da nova página aqui
  }
}
