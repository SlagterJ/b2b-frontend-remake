import { Order } from "./order.model";

export interface CustomerProperties {
  id: number;
  name: string;
  orders: Order[];
}

export class Customer implements CustomerProperties {
  public id;
  public name;
  public orders;

  public constructor(properties: CustomerProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.orders = properties.orders;
  }
}
