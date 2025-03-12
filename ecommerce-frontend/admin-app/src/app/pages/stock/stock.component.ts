import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../autentication/service/data/dashboard.service';
import { Stock } from '../../autentication/interface/stock';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock',
  imports: [FormsModule, RouterLink],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
  stock: Stock[] = [];
  search = ""

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.listLowStock();
  }

  listLowStock(){
    return this.dashboardService.getLowStockProducts().subscribe(
      (response) => {
        this.stock = response;
      },
      (error) => {
        console.log('Erro ao listar produtos com baixo estoque', error);
      }
    );
  }
}
