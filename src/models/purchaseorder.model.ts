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
}
