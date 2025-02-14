import { Component } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(
      public darkModeService: DarkModeService
  ) {}
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode(); // Alterna o modo escuro
  }
} 
