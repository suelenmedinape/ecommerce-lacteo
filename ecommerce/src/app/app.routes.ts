import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'produto/:id', component: ProdutoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];
