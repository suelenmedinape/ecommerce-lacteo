import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { delay, map, Observable, of } from 'rxjs';
import { Dashboard } from '../../interface/dashboard';
import { Stock } from '../../interface/stock';

interface StatusDataResponse {
  months: string[];
  status: Array<{
    name: string;
    data: number[];
  }>;
}

// Interface existente (ajustada para o novo formato)
interface StatusData {
  status: Array<{
    name: string;
    data: number[];
  }>;
  mes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = '/dashboard';

  constructor(private http: HttpClient, private headerService: HeadersService) { }

  getCompletedOrdersInTheMonth(): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Dashboard>(`${this.apiUrl}/orders/current-month`, { headers });
  }

  getTotalSales(): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Dashboard>(`${this.apiUrl}/orders/total-revenue`, { headers });
  }

  getStatusData(): Observable<StatusData> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<StatusDataResponse>(`${this.apiUrl}/orders/status-summary`, { headers }).pipe(
      map(response => ({
        status: response.status,
        mes: response.months 
      })),
      delay(500) 
    );
  }

  getLowStockProducts(): Observable<Stock[]> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Stock[]>(`${this.apiUrl}/products/low-stock`, { headers }); 
  }

  getTotalRevenue(startDate: Date, endDate: Date): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders();
    
    // Format dates to YYYY-MM-DD
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    return this.http.get<Dashboard>(
      `${this.apiUrl}/orders/total-revenue/count?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, 
      { headers }
    );
  }
}
