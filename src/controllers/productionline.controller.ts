import { ProductionLine } from "../models/productionline.model";
import { createBackendRoute } from "../global/env";

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
    return data.map((item: any) => ProductionLine.fromJSON(item));
  }

  public static async create(
    productionLine: ProductionLine,
  ): Promise<ProductionLine> {
    const productionLineJSON = productionLine.toJSON();

    await fetch(createBackendRoute("ProductionLine"), {
      method: "POST",
      body: JSON.stringify(productionLineJSON),
    });

    return productionLine;
  }

  public static async update(
    productionLine: ProductionLine,
  ): Promise<ProductionLine> {
    const id = productionLine.id;

    const productionLineJSON = productionLine.toJSON();

    await fetch(createBackendRoute(["ProductionLine", id.toString()]), {
      method: "PUT",
      body: JSON.stringify(productionLineJSON),
    });

    return productionLine;
  }

  public static async delete(
    productionLine: ProductionLine,
  ): Promise<ProductionLine> {
    const id = productionLine.id;
    await fetch(createBackendRoute(["ProductionLine", id.toString()]), {
      method: "DELETE",
    });

    return productionLine;
  }
}
