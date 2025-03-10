import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../autentication/service/order/orders.service';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusComponent } from '../../shared/models/order-status/order-status.component';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { Order } from '../../autentication/interface/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [OrderStatusComponent, PaginationComponent]
})
export class OrdersComponent implements OnInit{ 

  orders: Order[] = [];

  itemsPerPage = 10; // Quantos produtos por página
  currentPage = 1; // Página inicial
  
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
      this.listOrders();
  }

  listOrders() {
    this.ordersService.listOrders().subscribe((response: any) => {
      this.orders = response;
    });
  }

  dateFormated(date: string) {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  cancelOrder(id: number) {
    this.ordersService.updateStatus(id, 'cancelado').subscribe(() => {
      this.listOrders();
    });
  }

  finalizarOrder(id: number) {
    this.ordersService.updateStatus(id, 'finalizado').subscribe(() => {
      this.listOrders();
    });
  }

  get totalPages() {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page; // Atualiza a página atual
  }
}
