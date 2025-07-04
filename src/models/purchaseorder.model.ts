import { Product } from "./product.model";

export interface PurchaseOrderProperties {
  id: number;
  status: string;
  product: Product;
}

export class PurchaseOrder implements PurchaseOrderProperties {
  public id;
  public status;
  public product;

  public constructor(properties: PurchaseOrderProperties) {
    this.id = properties.id;
    this.status = properties.status;
    this.product = properties.product;
  }

  public static fromJSON(json: any): PurchaseOrder {
    return new PurchaseOrder({
      id: json.id,
      status: json.status,
      product: Product.fromJSON(json.product),
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      status: this.status,
      product: this.product.id,
    };
  }
}
