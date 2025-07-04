import { Planning } from "../models/planning.model";
import { createBackendRoute } from "../global/env";

export class CustomerController {
  public static async readAll(): Promise<Planning[]> {
    const response = await fetch(createBackendRoute("Planning"));
    const data = await response.json();
    return data.map((item: any) => Planning.fromJSON(item));
  }

  public static async readOneById(id: number): Promise<Planning> {
    const response = await fetch(
      createBackendRoute(["Planning", id.toString()]),
    );
    const data = await response.json();
    return data.map((item: any) => Planning.fromJSON(item));
  }

  public static async create(planning: Planning): Promise<Planning> {
    const planningJSON = planning.toJSON();

    await fetch(createBackendRoute("Planning"), {
      method: "POST",
      body: JSON.stringify(planningJSON),
    });

    return planning;
  }

  public static async update(planning: Planning): Promise<Planning> {
    const id = planning.id;

    const planningJSON = planning.toJSON();

    await fetch(createBackendRoute(["Planning", id.toString()]), {
      method: "PUT",
      body: JSON.stringify(planningJSON),
    });

    return planning;
  }

  public static async delete(planning: Planning): Promise<Planning> {
    const id = planning.id;
    await fetch(createBackendRoute(["Planning", id.toString()]), {
      method: "DELETE",
    });

    return planning;
  }
}
