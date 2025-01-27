import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalPages = 10; // Recebe o total de páginas
  @Output() pageChange = new EventEmitter<number>(); // Emite eventos de mudança de página
  currentPage = 1;

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage); // Emite o número da nova página
    }
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
