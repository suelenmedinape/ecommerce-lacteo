import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './_component/navbar/navbar.component';
import { FooterComponent } from './_component/footer/footer.component';
import { UserType } from './Models/user-types.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-dark-mode';
  // TODO: Integrar com o sistema de autenticação
  userType: UserType = UserType.CLIENTE // Defina o tipo de usuário aqui para testes
}
