import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from '../../../autentication/interface/dashboard';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CardConfig } from '../../../autentication/interface/card-config';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css'
})
export class DashboardCardComponent implements OnInit {
  @Input() config!: CardConfig

  dashboard?: Dashboard
  loading = true
  error = false

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.loading = true

    let request$: Observable<Dashboard>

    if (this.config.endpoint === "completedMonthly") {
      request$ = this.dashboardService.getCompletedOrdersInTheMonth()
    } else {
      request$ = this.dashboardService.getTotalSales()
    }

    request$.subscribe({
      next: (data: Dashboard) => {
        this.dashboard = data
        this.loading = false
      },
      error: (err) => {
        console.error(`Error fetching ${this.config.endpoint} data:`, err)
        this.error = true
        this.loading = false
      },
    })
  }
}
