import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @Output() hideNavbarEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    // Emite o evento para esconder o navbar assim que o componente for carregado
    this.hideNavbarEvent.emit();
  }
}
