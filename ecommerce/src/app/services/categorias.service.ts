import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categorias = [
    { id: 1, nome: "Leites e Bebidas", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { id: 2, nome: "Queijos", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    { id: 3, nome: "Iogurtes e Sobremesas", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
    { id: 4, nome: "Manteigas e Cremes", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  ];
  
  getCategorias() {
    return this.categorias;
  }

  getCategoriaById(id: number) {
    return this.categorias.find((categoria) => categoria.id === id);
  }
}
