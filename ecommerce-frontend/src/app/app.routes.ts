import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './users-pages/home/home.component';
import { ShopComponent } from './users-pages/shop/shop.component';
import { ProdutosComponent } from './users-pages/produtos/produtos.component';
import { LoginComponent } from './users-pages/auth/login/login.component';
import { RegisterComponent } from './cliente-pages/auth/register/register.component';
import { AccountComponent } from './cliente-pages/account/account.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'produto/:id', component: ProdutosComponent},
    {path: "login", component: LoginComponent },
    {path: "register", component: RegisterComponent },
    {path: 'account', component: AccountComponent},
];