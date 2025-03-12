import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { EditComponent } from './pages/auth/edit/edit.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StockComponent } from './pages/stock/stock.component';
import { TotalRevenueComponent } from './pages/reports/total-revenue/total-revenue.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'insert', component: RegisterComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'data', component: DashboardComponent},
    {path: 'stock', component: StockComponent},
    {path: 'total-revenue', component: TotalRevenueComponent},
];
