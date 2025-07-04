import { Order } from "./order.model";
import { ProductionLine } from "./productionline.model";

export interface PlanningProperties {
  id: number;
  plannedDate?: Date;
  order: Order;
  productionLine: ProductionLine;
}

export class Planning implements PlanningProperties {
  public id;
  public plannedDate;
  public order;
  public productionLine;

  public constructor(properties: PlanningProperties) {
    this.id = properties.id;
    this.plannedDate = properties.plannedDate;
    this.order = properties.order;
    this.productionLine = properties.productionLine;
  }

  public static fromJSON(json: any): Planning {
    return new Planning({
      id: json.id,
      plannedDate: json.plannedDate ? new Date(json.plannedDate) : undefined,
      order: Order.fromJSON(json.order),
      productionLine: ProductionLine.fromJSON(json.productionLine),
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      plannedDate: this.plannedDate?.toISOString() ?? null,
      order: this.order.id,
      productionLine: this.productionLine.id,
    };
  }
}
