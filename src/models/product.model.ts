export interface ProductProperties {
  id?: number;
  name: string;
  price: number;
  costPrice: number;
  blueBlocks: number;
  redBlocks: number;
  greyBlocks: number;
  productionTime: number;
}

export class Product implements ProductProperties {
  public id;
  public name;
  public price;
  public costPrice;
  public blueBlocks;
  public redBlocks;
  public greyBlocks;
  public productionTime;

  public constructor(properties: ProductProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.price = properties.price;
    this.costPrice = properties.costPrice;
    this.blueBlocks = properties.blueBlocks;
    this.redBlocks = properties.redBlocks;
    this.greyBlocks = properties.greyBlocks;
    this.productionTime = properties.productionTime;
  }

  public static fromJSON(json: any): Product {
    return new Product({
      id: json.id,
      name: json.name,
      price: json.price,
      costPrice: json.costPrice,
      blueBlocks: json.blueBlocks,
      redBlocks: json.redBlocks,
      greyBlocks: json.greyBlocks,
      productionTime: json.productionTime,
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      costPrice: this.costPrice,
      blueBlocks: this.blueBlocks,
      redBlocks: this.redBlocks,
      greyBlocks: this.greyBlocks,
      productionTime: this.productionTime,
    };
  }
}
