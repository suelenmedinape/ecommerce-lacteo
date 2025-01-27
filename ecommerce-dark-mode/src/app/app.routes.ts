import { Routes } from '@angular/router';
import { HomeComponent } from './users-pages/home/home.component';
import { ShopComponent } from './users-pages/shop/shop.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: ShopComponent},
];
