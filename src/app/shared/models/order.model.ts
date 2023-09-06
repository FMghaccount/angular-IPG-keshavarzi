import { CartItem } from './cartItem.model';

export class cart {
  constructor(
    public id: string,
    public price: number,
    public items: CartItem[],
    public amount: number,
    public isPaid: boolean,
    public expirationDate: Date
  ) {}
}
export class Order {
  constructor(
    public id: string,
    public refId: string,
    public expirationTime: string,
    public cart: cart[]
  ) {}
}
