import { Injectable } from '@angular/core';
import { Product } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;



  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  getheaders(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return headers;
  }



  getProducts(): Observable<Product[]> {
    const headers = this.getheaders();
    
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { headers }).pipe(
      //Esto es para manejar errores y redirigir al login si el token es inválido o caducado
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
