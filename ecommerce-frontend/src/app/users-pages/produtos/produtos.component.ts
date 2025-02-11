import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtos.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get("id"));
      this.produtoService.getProdutoById(id).subscribe({
        next: (produto) => {
          this.produto = produto; // Atribui o produto recebido à variável
        },
        error: (err) => {
          console.error("Erro ao buscar produto:", err);
          this.produto = null; // Define produto como null em caso de erro
        },
      });
    });
  }
}
