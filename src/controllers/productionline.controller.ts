import { ProductionLine } from "../models/productionline.model";
import { createBackendRoute } from "../global/env";

export interface CreateProductionLineDTO {}

export class ProductionLineController {
  public static async readAll(): Promise<ProductionLine[]> {
    const response = await fetch(createBackendRoute("ProductionLine"));
    const data = await response.json();
    return data.map((item: any) => ProductionLine.fromJSON(item));
  }

  public static async readOneById(id: number): Promise<ProductionLine> {
    const response = await fetch(
      createBackendRoute(["ProductionLine", id.toString()]),
    );
    const data = await response.json();
    return ProductionLine.fromJSON(data);
  }

  public static async create(
    productionLine: CreateProductionLineDTO,
  ): Promise<ProductionLine> {
    const response = await fetch(createBackendRoute("ProductionLine"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productionLine),
    });

    const data = response.json();

    return ProductionLine.fromJSON(data);
  }

  public static async update(
    productionLine: ProductionLine,
  ): Promise<ProductionLine> {
    const id = productionLine.id;

    const productionLineJSON = productionLine.toJSON();

    const response = await fetch(
      createBackendRoute(["ProductionLine", id.toString()]),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productionLineJSON),
      },
    );

    const data = await response.json();

    return ProductionLine.fromJSON(data);
  }

  public static async delete(id: number): Promise<ProductionLine> {
    const response = await fetch(
      createBackendRoute(["ProductionLine", id.toString()]),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await response.json();

    return ProductionLine.fromJSON(data);
  }
}
