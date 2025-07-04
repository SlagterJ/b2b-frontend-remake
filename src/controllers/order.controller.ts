import { Order } from "../models/order.model";
import { createBackendRoute } from "../global/env";

export interface CreateOrderProperties {
  quantity: number;
  customerId: number;
  productId: number;
  status: string;
}

export class OrderController {
  public static async readAll(): Promise<Order[]> {
    const response = await fetch(createBackendRoute("Orders"));
    const data = await response.json();
    return data.map((item: any) => Order.fromJSON(item));
  }

  public static async readOneById(id: number): Promise<Order> {
    const response = await fetch(createBackendRoute(["Orders", id.toString()]));
    const data = await response.json();
    return data.map((item: any) => Order.fromJSON(item));
  }

  public static async create(order: CreateOrderProperties): Promise<Order> {
    console.log("create order called!");
    console.table(order);
    console.log(JSON.stringify(order));

    const response = await fetch(createBackendRoute("Orders"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    return Order.fromJSON(data);
  }

  public static async update(order: Order): Promise<Order> {
    const id = order.id;

    const orderJSON = order.toJSON();

    await fetch(createBackendRoute(["Orders", id.toString()]), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderJSON),
    });

    return order;
  }

  public static async delete(id: number): Promise<boolean> {
    await fetch(createBackendRoute(["Orders", id.toString()]), {
      method: "DELETE",
    }).catch((_) => {
      return false;
    });

    return true;
  }
}
