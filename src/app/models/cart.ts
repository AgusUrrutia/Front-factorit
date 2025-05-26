import { Product } from "./product";

export type TipeCart = 'COMUN' | 'FECHA_ESPECIAL' | 'VIP';

export interface Cart {
  _id?: string;
  id: string;
  clienteId: string;
  products: Product[],
  cartType: TipeCart;
  date: Date;
  subtotal: number;
  totalDiscount: number;
  totalPrice: number;
}