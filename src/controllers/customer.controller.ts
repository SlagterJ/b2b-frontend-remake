import { Customer } from "../models/customer.model";
import { createBackendRoute } from "../global/env";

export interface CreateCustomerDTO {
  name: string;
}

export class CustomerController {
  public static async readAll(): Promise<Customer[]> {
    const response = await fetch(createBackendRoute("Customers"));
    const data = await response.json();
    return data.map((item: any) => Customer.fromJSON(item));
  }

  public static async readOneById(id: number): Promise<Customer> {
    const response = await fetch(
      createBackendRoute(["Customers", id.toString()]),
    );
    const data = await response.json();
    return Customer.fromJSON(data);
  }

  public static async create(customer: CreateCustomerDTO): Promise<Customer> {
    const response = await fetch(createBackendRoute("Customers"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });

    const data = await response.json();

    return Customer.fromJSON(data);
  }

  public static async update(customer: Customer): Promise<Customer> {
    const id = customer.id;

    const customerJSON = customer.toJSON();

    const response = await fetch(
      createBackendRoute(["Customers", id.toString()]),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerJSON),
      },
    );

    const data = await response.json();

    return Customer.fromJSON(data);
  }

  public static async delete(id: number): Promise<Customer> {
    const response = await fetch(
      createBackendRoute(["Customers", id.toString()]),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await response.json();

    return Customer.fromJSON(data);
  }
}
