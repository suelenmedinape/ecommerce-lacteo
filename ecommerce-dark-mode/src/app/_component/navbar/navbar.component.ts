import { Component } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public darkModeService: DarkModeService) {}
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
