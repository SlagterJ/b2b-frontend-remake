import { Product } from "./product.model";
import { ProductionLine } from "./productionline.model";

export interface PurchaseOrderProperties {
  id: number;
  status: string;
  product: Product;
  productionLine: ProductionLine;
}

export class PurchaseOrder implements PurchaseOrderProperties {
  public id;
  public status;
  public product;
  public productionLine;

  public constructor(properties: PurchaseOrderProperties) {
    this.id = properties.id;
    this.status = properties.status;
    this.product = properties.product;
    this.productionLine = properties.productionLine;
  }

  public static fromJSON(json: any): PurchaseOrder {
    return new PurchaseOrder({
      id: json.id,
      status: json.status,
      product: Product.fromJSON(json.product),
      productionLine: ProductionLine.fromJSON(json.productionLine),
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      status: this.status,
      productId: this.product.id,
      productionLineId: this.productionLine.id,
    };
  }
}
