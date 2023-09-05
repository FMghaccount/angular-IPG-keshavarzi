import { Product } from './product.model';

export class CartItem {
  public amount: number;
  public item: Product;
  public price: number;
  public title: string;

  constructor(amount: number, item: Product, price: number, title: string) {
    this.title = title;
    this.item = item;
    this.price = price;
    this.amount = amount;
  }
}
