import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-status',
  imports: [],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent {
  @Input() levelSatatus: string = '';


}
