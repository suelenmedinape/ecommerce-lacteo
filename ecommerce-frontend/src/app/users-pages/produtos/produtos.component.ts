import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoService } from '../../service/produtos.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
  providers: [ProdutoService],
})
export class ProdutosComponent implements OnInit {
  produtos: { id: number; productName: string; price: number }[] = [];
  produto: any;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  )  {}

  ngOnInit(): void {
    this.getproduct();
  }
 
  getproduct(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get("id")); // Obtém o id do produto da URL
      this.produtoService.getProdutoById(id).subscribe({ // Busca o produto pelo id
        next: (produto) => { this.produto = produto; }, // Atribui o produto recebido à variável 
        error: (err) => { this.produto = null; }, // Define produto como null em caso de erro
      });
    });
  }
}
