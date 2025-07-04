export interface ProductionLineInterface {
  id: number;
  name: string;
  isActive: boolean;
}

export class ProductionLine {
  id: number;
  name: string;
  isActive: boolean;

  public constructor(properties: ProductionLineInterface) {
    this.id = properties.id;
    this.name = properties.name;
    this.isActive = properties.isActive;
  }
}
