import { Customer } from "../models/customer.model";
import { createBackendRoute } from "../global/env";

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
    return data.map((item: any) => Customer.fromJSON(item));
  }

  public static async create(customer: Customer): Promise<Customer> {
    const customerJSON = customer.toJSON();

    await fetch(createBackendRoute("Customers"), {
      method: "POST",
      body: JSON.stringify(customerJSON),
    });

    return customer;
  }

  public static async update(customer: Customer): Promise<Customer> {
    const id = customer.id;

    const customerJSON = customer.toJSON();

    await fetch(createBackendRoute(["Customers", id.toString()]), {
      method: "PUT",
      body: JSON.stringify(customerJSON),
    });

    return customer;
  }

  public static async delete(customer: Customer): Promise<Customer> {
    const id = customer.id;
    await fetch(createBackendRoute(["Customers", id.toString()]), {
      method: "DELETE",
    });

    return customer;
  }
}
