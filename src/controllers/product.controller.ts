import { Product } from "../models/product.model";
import { createBackendRoute } from "../global/env";

export interface CreateProductDTO {}

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
    return Product.fromJSON(data);
  }

  public static async create(product: CreateProductDTO): Promise<Product> {
    await fetch(createBackendRoute("Products"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    return Product.fromJSON(product);
  }

  public static async update(product: Product): Promise<Product> {
    const id = product.id;

    const productJSON = product.toJSON();

    const response = await fetch(
      createBackendRoute(["Products", id.toString()]),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productJSON),
      },
    );

    const data = response.json();

    return Product.fromJSON(product);
  }

  public static async delete(id: number): Promise<Product> {
    const response = await fetch(
      createBackendRoute(["Products", id.toString()]),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = response.json();

    return Product.fromJSON(data);
  }
}
