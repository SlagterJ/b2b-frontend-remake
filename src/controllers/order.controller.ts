import { Order } from "../models/order.model";
import { createBackendRoute } from "../global/env";

export interface CreateOrderDTO {
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
    return Order.fromJSON(data);
  }

  public static async create(order: CreateOrderDTO): Promise<Order> {
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

    const response = await fetch(
      createBackendRoute(["Orders", id.toString()]),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderJSON),
      },
    );

    const data = await response.json();

    return Order.fromJSON(data);
  }

  public static async delete(id: number): Promise<Order> {
    const response = await fetch(
      createBackendRoute(["Orders", id.toString()]),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = response.json();

    return Order.fromJSON(data);
  }
}
