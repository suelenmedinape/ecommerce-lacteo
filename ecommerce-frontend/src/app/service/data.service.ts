import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface ApiResponse {
  success: boolean;
  data: any;
} 

@Injectable({
  providedIn: "root",
})
export class DataService {
  private apiUrl = "http://localhost:8080"; // URL do backend

  constructor(private http: HttpClient) {}

  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/data`).pipe(
      catchError(this.handleError)
    );
  }

  postData(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/data`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("Erro na requisição:", error);
    return throwError(() => new Error("Erro na comunicação com o servidor"));
  }
}