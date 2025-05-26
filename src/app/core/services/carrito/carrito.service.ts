import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Cart} from '../../../models/cart';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  getheaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return headers;
  }

  crearCarrito(): Observable<Cart> {
    const headers = this.getheaders();
    return this.http.post<Cart>(`${this.apiUrl}/carts`, {}, { headers })
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => new Error('Error al crear el carrito'));
      })
    );
  }

  getCarrito(): Observable<Cart> {
    const headers = this.getheaders();
    return this.http.get<Cart>(`${this.apiUrl}/carts`, { headers })
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        if (error.status === 404) {
          return this.crearCarrito();
        }
        return throwError(() => new Error('Error al obtener el carrito'));
      })
    );
  }

  agregarProducto(productId: string, quantity: number): Observable<any> {
    const headers = this.getheaders();
    console.log(productId, quantity);
    
    return this.http.post(`${this.apiUrl}/carts/producto/agregar`, { productId, quantity }, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => new Error('Error al agregar producto'));
      })
    );
  }

  eliminarProducto(productId: string, quantity: number): Observable<any> {
    const headers = this.getheaders();
    return this.http.post(`${this.apiUrl}/carts/producto/quitar`, { productId, quantity }, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => new Error('Error al eliminar producto'));
      })
    );
  }

  finalizarCompra(fecha: Date): Observable<any> {
    const headers = this.getheaders();
    return this.http.post(`${this.apiUrl}/carts/finalizar`, { fecha }, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => new Error('Error al finalizar la compra'));
      })
    );
  }
}