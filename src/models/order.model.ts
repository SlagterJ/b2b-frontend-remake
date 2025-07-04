export interface OrderProperties {
  id?: number;
  quantity: number;
  status: string;
  orderDate: Date;
  approvedDate?: Date;
  rejectedDate?: Date;
  deliveredDate?: Date;
  comment: string;
  forwardedToSupplier: boolean;
  rejectionReason: string;
}

export class Order implements OrderProperties {
  public id;
  public quantity;
  public status;
  public orderDate;
  public approvedDate;
  public rejectedDate;
  public deliveredDate;
  public comment;
  public forwardedToSupplier;
  public rejectionReason;

  public constructor(properties: OrderProperties) {
    this.id = properties.id;
    this.quantity = properties.quantity;
    this.status = properties.status;
    this.orderDate = properties.orderDate;
    this.approvedDate = properties.approvedDate;
    this.rejectedDate = properties.rejectedDate;
    this.deliveredDate = properties.deliveredDate;
    this.comment = properties.comment;
    this.forwardedToSupplier = properties.forwardedToSupplier;
    this.rejectionReason = properties.rejectionReason;
  }

  public static fromJSON(json: any): Order {
    return new Order({
      id: json.id,
      quantity: json.quantity,
      status: json.status,
      orderDate: json.orderDate ? new Date(json.orderDate) : new Date(),
      approvedDate: json.approvedDate ? new Date(json.approvedDate) : undefined,
      rejectedDate: json.rejectedDate ? new Date(json.rejectedDate) : undefined,
      deliveredDate: json.deliveredDate
        ? new Date(json.deliveredDate)
        : undefined,
      comment: json.comment,
      forwardedToSupplier: json.forwardedToSupplier,
      rejectionReason: json.rejectionReason,
    });
  }

  public toJSON(): any {
    return {
      id: this.id,
      quantity: this.quantity,
      status: this.status,
      orderDate: this.orderDate?.toISOString() ?? null,
      approvedDate: this.approvedDate?.toISOString() ?? null,
      rejectedDate: this.rejectedDate?.toISOString() ?? null,
      deliveredDate: this.deliveredDate?.toISOString() ?? null,
      comment: this.comment,
      forwardedToSupplier: this.forwardedToSupplier,
      rejectionReason: this.rejectionReason,
    };
  }
}
