import { createBackendRoute } from "../global/env";
import { PurchaseOrder } from "../models/purchaseorder.model";

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
    purchaseOrders: PurchaseOrder,
  ): Promise<PurchaseOrder> {
    const purchaseOrderJSON = purchaseOrders.toJSON();

    await fetch(createBackendRoute("PurchaseOrders"), {
      method: "POST",
      body: JSON.stringify(purchaseOrderJSON),
    });

    return purchaseOrders;
  }

  public static async update(
    purchaseOrders: PurchaseOrder,
  ): Promise<PurchaseOrder> {
    const id = purchaseOrders.id;

    const purchaseOrderJSON = purchaseOrders.toJSON();

    await fetch(createBackendRoute(["PurchaseOrders", id.toString()]), {
      method: "PUT",
      body: JSON.stringify(purchaseOrderJSON),
    });

    return purchaseOrders;
  }

  public static async delete(
    purchaseOrders: PurchaseOrder,
  ): Promise<PurchaseOrder> {
    const id = purchaseOrders.id;
    await fetch(createBackendRoute(["PurchaseOrders", id.toString()]), {
      method: "DELETE",
    });

    return purchaseOrders;
  }
}
