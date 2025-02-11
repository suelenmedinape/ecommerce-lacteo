import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/products'; // URL do backend

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  getProdutoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getProdutoByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, { params: { name } });
  }
}