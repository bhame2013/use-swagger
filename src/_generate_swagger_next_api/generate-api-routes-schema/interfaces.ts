import { ReferenceObject, SchemaObject } from "@/_generate_swagger/openapi-interfaces";

export type MethodsRouteApi = "put" | "delete" | "post" | "get";

export type RouteApi = {
  [key: string]: {
    [method in MethodsRouteApi]: {
      params: SchemaObject | ReferenceObject
      requestBody: SchemaObject | ReferenceObject
      result: SchemaObject | ReferenceObject
    }
  };
};