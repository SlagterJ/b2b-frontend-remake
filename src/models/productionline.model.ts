export interface ProductionLineInterface {
  id: number;
  name: string;
  isActive: boolean;
}

export class ProductionLine {
  public id;
  public name;
  public isActive;

  public constructor(properties: ProductionLineInterface) {
    this.id = properties.id;
    this.name = properties.name;
    this.isActive = properties.isActive;
  }

  public static fromJSON(json: any): ProductionLine {
    return new ProductionLine({
      id: json.id,
      name: json.name,
      isActive: json.isActive,
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      isActive: this.isActive,
    };
  }
}
