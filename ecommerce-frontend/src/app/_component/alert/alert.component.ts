
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  imports: []
})
export class AlertComponent {
  @Input() message: string = 'Ocorreu um erro!';
  @Input() showAlert: boolean = false;
  @Input() categAlert: number = 0;
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
