import { Order } from "./order.model";
import { ProductionLine } from "./productionline.model";

export interface PlanningProperties {
  id: number;
  plannedDate: Date;
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
}
