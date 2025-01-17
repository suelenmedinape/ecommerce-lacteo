import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleDropdown(event: Event): void {
    const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
    const isVisible = dropdown.classList.contains('show');

    if (isVisible) {
      this.renderer.removeClass(dropdown, 'show');
    } else {
      this.renderer.addClass(dropdown, 'show');
    }
  }
}
