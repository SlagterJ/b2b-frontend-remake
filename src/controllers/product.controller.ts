import { Product } from "../models/product.model";
import { createBackendRoute } from "../global/env";

export class ProductController {
  public static async readAll(): Promise<Product[]> {
    const response = await fetch(createBackendRoute("Products"));
    const data = await response.json();
    return data.map((item: any) => Product.fromJSON(item));
  }

  public static async readOneById(id: number): Promise<Product> {
    const response = await fetch(
      createBackendRoute(["Products", id.toString()]),
    );
    const data = await response.json();
    return data.map((item: any) => Product.fromJSON(item));
  }

  public static async create(product: Product): Promise<Product> {
    const productJSON = product.toJSON();

    await fetch(createBackendRoute("Products"), {
      method: "POST",
      body: JSON.stringify(productJSON),
    });

    return product;
  }

  public static async update(product: Product): Promise<Product> {
    const id = product.id;

    const productJSON = product.toJSON();

    await fetch(createBackendRoute(["Products", id.toString()]), {
      method: "PUT",
      body: JSON.stringify(productJSON),
    });

    return product;
  }

  public static async delete(product: Product): Promise<Product> {
    const id = product.id;
    await fetch(createBackendRoute(["Products", id.toString()]), {
      method: "DELETE",
    });

    return product;
  }
}
