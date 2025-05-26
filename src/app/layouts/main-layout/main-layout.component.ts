import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { SharedService } from '../../core/services/shared/shared.service';
import { CarritoService } from '../../core/services/carrito/carrito.service';
import {MatBadgeModule} from '@angular/material/badge';
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private authService : AuthService,
    private sharedService : SharedService,
    private carritoService: CarritoService
  ) { }
  ngOnInit(): void {
    this.getCart();
  }



  getCart() {
    this.carritoService.getCarrito().subscribe({
      next: (cart) => {
        this.sharedService.updateCart(cart);
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    });
  }

}
