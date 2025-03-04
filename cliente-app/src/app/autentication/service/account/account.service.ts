import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService { 
  private url = '/profile'

  constructor(private http: HttpClient, private headersService: HeadersService) { }

  getClientDetails(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.get(this.url, { headers });
  }

  updateClientDetails(clientUpdateDTO: any): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.put(this.url, clientUpdateDTO, { headers });
  }
}
