import { createBackendRoute } from "../global/env";
import { PurchaseOrder } from "../models/purchaseorder.model";

export interface CreatePurchaseOrderDTO {}

export class PurchaseOrderController {
  public static async readAll(): Promise<PurchaseOrder[]> {
    const response = await fetch(createBackendRoute("PurchaseOrders"));
    const data = await response.json();
    return data.map((item: any) => PurchaseOrder.fromJSON(item));
  }

  public static async readOneById(id: number): Promise<PurchaseOrder> {
    const response = await fetch(
      createBackendRoute(["PurchaseOrders", id.toString()]),
    );
    const data = await response.json();
    return data.map((item: any) => PurchaseOrder.fromJSON(item));
  }

  public static async create(
    purchaseOrder: CreatePurchaseOrderDTO,
  ): Promise<PurchaseOrder> {
    const response = await fetch(createBackendRoute("PurchaseOrders"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchaseOrder),
    });

    const data = await response.json();

    return PurchaseOrder.fromJSON(data);
  }

  public static async update(
    purchaseOrders: PurchaseOrder,
  ): Promise<PurchaseOrder> {
    const id = purchaseOrders.id;

    const purchaseOrderJSON = purchaseOrders.toJSON();

    const response = await fetch(
      createBackendRoute(["PurchaseOrders", id.toString()]),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseOrderJSON),
      },
    );

    const data = await response.json();

    return PurchaseOrder.fromJSON(data);
  }

  public static async delete(id: number): Promise<PurchaseOrder> {
    const response = await fetch(
      createBackendRoute(["PurchaseOrders", id.toString()]),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await response.json();

    return PurchaseOrder.fromJSON(data);
  }
}
