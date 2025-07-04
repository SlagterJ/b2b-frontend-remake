export interface OrderProperties {
  id: number;
  quantity: number;
  status: string;
  orderDate: Date;
  approvedDate: Date;
  rejectedDate: Date;
  deliveredDate: Date;
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
}
