import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isVisible: boolean = true;

  hide() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }
}
