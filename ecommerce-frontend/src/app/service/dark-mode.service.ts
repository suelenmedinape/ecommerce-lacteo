import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 

export class DarkModeService implements OnInit {
  
  isDarkMode = false;
  constructor() { }
  
  ngOnInit(): void {
    // Verifica o estado inicial baseado no localStorage
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode = darkMode === 'true';
    this.updateDarkModeClass();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateDarkModeClass();
  }

  private updateDarkModeClass(): void {
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
}