import { Order } from "../models/order.model";
import { createBackendRoute } from "../global/env";

export interface CreateOrderProperties {
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
    const response = await fetch(createBackendRoute("Orders"), {
      method: "POST",
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
