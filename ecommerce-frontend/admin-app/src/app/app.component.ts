import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './shared/_component/navbar/navbar.component';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-app';
}
