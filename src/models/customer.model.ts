import { Order } from "./order.model";

export interface CustomerProperties {
  id?: number;
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

  public static fromJSON(json: any): Customer {
    return new Customer({
      id: json.id,
      name: json.name,
      orders: json.orders?.map((o: any) => Order.fromJSON(o)) ?? [],
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      orders: this.orders.map((order) => order.id),
    };
  }
}
