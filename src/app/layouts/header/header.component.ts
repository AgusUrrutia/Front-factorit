import { Component } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import { AuthService } from '../../core/services/auth/auth.service';
import { SharedService } from '../../core/services/shared/shared.service';
import { CarritoService } from '../../core/services/carrito/carrito.service';
import { Cart} from '../../models/cart';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatBadgeModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  //le puse los tres tipos de datos porque no se si el cart va a ser null o undefined
  cart: Cart | null | undefined;
  products : number = 0;
  constructor(
    private authService : AuthService,
    private sharedService : SharedService,
    private carritoService: CarritoService
  ) {
    this.sharedService.cart$.subscribe(cart => {
      this.cart = cart;
      if (cart && cart.products) {
        this.products = cart.products.reduce((total, product) => total + (product.quantity || 0), 0);
      } else {
        this.products = 0;
      }
    });
   }

  
  logOut(){
    this.authService.logout();
  }
}
