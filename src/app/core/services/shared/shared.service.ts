import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private cartSubject = new BehaviorSubject<Cart | null>(null);

  cart$: Observable<Cart | null> = this.cartSubject.asObservable();

  constructor() {}
  getCart(): Cart | null {
    return this.cartSubject.value;
  }
  updateCart(cart: Cart) {
    this.cartSubject.next(cart);
  }
}
