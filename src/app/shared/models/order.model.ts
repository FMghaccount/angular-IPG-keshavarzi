import { CartItem } from './cartItem.model';

export interface cart {
  id: string;
  price: number;
  items: CartItem[];
  amount: number;
  isPaid: boolean;
  expirationDate: Date;
}

export class Order {
  constructor(
    public id: string,
    public refId: string,
    public expirationTime: string,
    public cart: cart[]
  ) {}
}
