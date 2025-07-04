export interface ProductProperties {
  id: number;
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
}
