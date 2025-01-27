import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private produtos = [
    { id: 1, nome: 'Queijo', preco: 15.0, avaliacao: 4.5, imagem: '/1.png', desc: 'Delicioso queijo artesanal.' },
{ id: 2, nome: 'Iogurte', preco: 25.0, avaliacao: 4.0, imagem: '/2.png', desc: 'Iogurte cremoso e saudável.' },
{ id: 3, nome: 'Leite', preco: 35.0, avaliacao: 3.5, imagem: '/3.png', desc: 'Leite fresco de alta qualidade.' },
{ id: 4, nome: 'Manteiga', preco: 45.0, avaliacao: 3.0, imagem: '/4.png', desc: 'Manteiga pura e saborosa.' },
{ id: 5, nome: 'Produto 5', preco: 55.0, avaliacao: 4.2, imagem: '/1.png', desc: 'Produto 5 com qualidade garantida.' },
{ id: 6, nome: 'Produto 6', preco: 65.0, avaliacao: 4.8, imagem: '/2.png', desc: 'Produto 6 com ingredientes premium.' },
{ id: 7, nome: 'Produto 7', preco: 75.0, avaliacao: 3.9, imagem: '/3.png', desc: 'Produto 7 ideal para sua rotina.' },
{ id: 8, nome: 'Produto 8', preco: 85.0, avaliacao: 4.5, imagem: '/4.png', desc: 'Produto 8 com sabor especial.' },
{ id: 9, nome: 'Produto 9', preco: 95.0, avaliacao: 3.7, imagem: '/1.png', desc: 'Produto 9 para todas as ocasiões.' },
{ id: 10, nome: 'Produto 10', preco: 105.0, avaliacao: 4.0, imagem: '/2.png', desc: 'Produto 10 de alta durabilidade.' },
{ id: 11, nome: 'Produto 11', preco: 115.0, avaliacao: 4.3, imagem: '/3.png', desc: 'Produto 11 feito com carinho.' },
{ id: 12, nome: 'Produto 12', preco: 125.0, avaliacao: 4.6, imagem: '/4.png', desc: 'Produto 12 perfeito para você.' },
{ id: 13, nome: 'Produto 13', preco: 135.0, avaliacao: 3.8, imagem: '/1.png', desc: 'Produto 13 de qualidade superior.' },
{ id: 14, nome: 'Produto 14', preco: 145.0, avaliacao: 4.1, imagem: '/2.png', desc: 'Produto 14 para uso diário.' },
{ id: 15, nome: 'Produto 15', preco: 155.0, avaliacao: 4.4, imagem: '/3.png', desc: 'Produto 15 com ótima avaliação.' },
{ id: 16, nome: 'Produto 16', preco: 165.0, avaliacao: 4.7, imagem: '/4.png', desc: 'Produto 16 com design inovador.' },
{ id: 17, nome: 'Produto 17', preco: 175.0, avaliacao: 3.6, imagem: '/1.png', desc: 'Produto 17 para diversas necessidades.' },
{ id: 18, nome: 'Produto 18', preco: 185.0, avaliacao: 4.9, imagem: '/2.png', desc: 'Produto 18 com alta performance.' },
{ id: 19, nome: 'Produto 19', preco: 195.0, avaliacao: 4.2, imagem: '/3.png', desc: 'Produto 19 durável e confiável.' },
{ id: 20, nome: 'Produto 20', preco: 205.0, avaliacao: 3.9, imagem: '/4.png', desc: 'Produto 20 de alta tecnologia.' },
{ id: 21, nome: 'Produto 21', preco: 215.0, avaliacao: 4.0, imagem: '/1.png', desc: 'Produto 21 com excelente custo-benefício.' },
{ id: 22, nome: 'Produto 22', preco: 225.0, avaliacao: 4.5, imagem: '/2.png', desc: 'Produto 22 altamente recomendado.' },
{ id: 23, nome: 'Produto 23', preco: 235.0, avaliacao: 3.7, imagem: '/3.png', desc: 'Produto 23 feito para durar.' },
{ id: 24, nome: 'Produto 24', preco: 245.0, avaliacao: 4.8, imagem: '/4.png', desc: 'Produto 24 líder em qualidade.' },
{ id: 25, nome: 'Produto 25', preco: 255.0, avaliacao: 4.1, imagem: '/1.png', desc: 'Produto 25 com garantia estendida.' },
{ id: 26, nome: 'Produto 26', preco: 265.0, avaliacao: 4.3, imagem: '/2.png', desc: 'Produto 26 para quem busca o melhor.' },
{ id: 27, nome: 'Produto 27', preco: 275.0, avaliacao: 4.6, imagem: '/3.png', desc: 'Produto 27 com preço competitivo.' },
{ id: 28, nome: 'Produto 28', preco: 285.0, avaliacao: 4.7, imagem: '/4.png', desc: 'Produto 28 com desempenho excepcional.' },
{ id: 29, nome: 'Produto 29', preco: 295.0, avaliacao: 3.8, imagem: '/1.png', desc: 'Produto 29 para uso prático.' },
{ id: 30, nome: 'Produto 30', preco: 305.0, avaliacao: 4.4, imagem: '/2.png', desc: 'Produto 30 altamente funcional.' },
{ id: 31, nome: 'Produto 31', preco: 315.0, avaliacao: 4.0, imagem: '/3.png', desc: 'Produto 31 desenvolvido para você.' },
{ id: 32, nome: 'Produto 32', preco: 325.0, avaliacao: 4.2, imagem: '/4.png', desc: 'Produto 32 com materiais de alta qualidade.' },
{ id: 33, nome: 'Produto 33', preco: 335.0, avaliacao: 4.5, imagem: '/1.png', desc: 'Produto 33 com acabamento impecável.' }

  ];

  getProdutos() {
    return this.produtos;
  }

  getProdutoById(id: number) {
    return this.produtos.find((produto) => produto.id === id);
  }
}
