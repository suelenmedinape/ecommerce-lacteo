import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLoggedIn: boolean = false; // estado de login

  constructor() { }

  ngOnInit(): void {
    // verificar se o usuário está logado
    const userStatus = localStorage.getItem('isLoggedIn');
    if (userStatus === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  login(){
    // simular login
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
  }

  logout(){
    // simular logout
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
  }
}
