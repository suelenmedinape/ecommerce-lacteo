import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../autentication/service/order/orders.service';
import { CurrencyPipe } from '@angular/common';
import { OrderStatusComponent } from '../../shared/models/order-status/order-status.component';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

export interface Order {
  id: number;
  date: string; 
  totalValue: number;
  orderStatus: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: []
})
export class OrdersComponent {
  
}
