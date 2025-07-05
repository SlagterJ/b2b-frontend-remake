import { Planning } from "../models/planning.model";
import { createBackendRoute } from "../global/env";

export interface CreatePlanningDTO {}

export class PlanningController {
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
    return Planning.fromJSON(data);
  }

  public static async create(planning: CreatePlanningDTO): Promise<Planning> {
    const response = await fetch(createBackendRoute("Planning"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planning),
    });

    const data = response.json();

    return Planning.fromJSON(data);
  }

  public static async update(planning: Planning): Promise<Planning> {
    const id = planning.id;

    const planningJSON = planning.toJSON();

    const response = await fetch(
      createBackendRoute(["Planning", id.toString()]),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planningJSON),
      },
    );

    const data = await response.json();

    return Planning.fromJSON(data);
  }

  public static async delete(id: number): Promise<Planning> {
    const response = await fetch(
      createBackendRoute(["Planning", id.toString()]),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await response.json();

    return Planning.fromJSON(data);
  }
}
