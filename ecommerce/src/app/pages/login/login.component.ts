import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.hide();
  }

} 
