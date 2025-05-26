import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { CarritoService } from '../../core/services/carrito/carrito.service';
import { Product } from '../../models/product';
import { Cart, TipeCart } from '../../models/cart';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../core/services/shared/shared.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {
  productos: Product[] = [];
  tipoCarrito: TipeCart = 'COMUN';
  haveCart: boolean = false;
  carrito: Cart = {
    id: '',
    clienteId: '',
    products: [],
    totalPrice: 0,
    cartType: this.tipoCarrito,
    date: new Date(),
    subtotal: 0,
    totalDiscount: 0
  };
  

  constructor(
    private carritoService: CarritoService,
    private sharedService: SharedService
  ) {}


  ngOnInit(): void {
    this.sharedService.cart$.subscribe(cart => {
      if (cart) {
        this.carrito = cart;
        this.tipoCarrito = cart.cartType;
        this.haveCart = true;
      } else {
        this.haveCart = false;
      }
    });
      this.carritoService.getCarrito().subscribe(cart => {
        this.carrito = cart;
        this.tipoCarrito = cart.cartType;
      });
  }

  crearCarrito() {
    this.carritoService.crearCarrito().subscribe(carrito => {
      this.sharedService.updateCart(carrito);
      carrito.cartType = this.tipoCarrito;
    });
  }



  agregarProducto(productId: string) {
    this.carritoService.agregarProducto(productId, 1).subscribe(() => {
      this.carritoService.getCarrito().subscribe(cart => {
        this.sharedService.updateCart(cart);
        this.carrito = cart;
      });
    });
  }
  
  eliminarProducto(productId: string) {
    this.carritoService.eliminarProducto(productId, 1).subscribe(() => {
      this.carritoService.getCarrito().subscribe(cart => {
        this.sharedService.updateCart(cart);
        this.carrito = cart;
      });
    });
  }
  
  finalizarCompra() {
    const fecha = new Date();
    this.carritoService.finalizarCompra(fecha).subscribe(() => {
      this.carritoService.getCarrito().subscribe(cart => {
        this.sharedService.updateCart(cart);
        this.carrito = cart;
      });
    });
  }


}
