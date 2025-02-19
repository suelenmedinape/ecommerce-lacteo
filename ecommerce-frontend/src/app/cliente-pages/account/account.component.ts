import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userInfo: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userInfo$.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });

    // Força a busca das informações do usuário ao carregar a página
    this.authService.fetchUserInfo();
  }
}