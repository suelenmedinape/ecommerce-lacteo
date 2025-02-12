import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  imports: [CommonModule, NgIf]
})
export class AlertComponent {
  @Input() message: string = 'Ocorreu um erro!';
  @Input() showAlert: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
