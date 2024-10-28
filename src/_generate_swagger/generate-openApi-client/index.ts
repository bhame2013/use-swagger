import {
  ReferenceObject,
  SchemaObject,
} from "../openapi-interfaces";
import {
  RouteApi,
  MethodsRouteApi,
} from "_generate_swagger/generate-api-routes-schema/interfaces";

function simplifySchema(schema?: SchemaObject | ReferenceObject): any {

  if ((schema as any)?.["$ref"]) {
    const referenceObject = schema as ReferenceObject;

    return referenceObject["$ref"].replace("#/components/schemas/", "");
  }

  const schemaObject = schema as SchemaObject;

  if (schemaObject.type === "array" && "items" in schema) {
    return `${simplifySchema(schema.items)}[]`;
  }

  if (schemaObject.type === "object" && schemaObject.properties) {
    return Object.entries(schemaObject.properties).reduce(
      (acc, [key, value]) => {
        acc[key] = simplifySchema(value);
        return acc;
      },
      {} as Record<string, any>
    );
  }

  if (schemaObject.format === "date-time") return "Date";

  return schemaObject;
}

function generateMethodsString(methods: RouteApi[MethodsRouteApi]): string {
  return Object.keys(methods)
    .map((method) => {
      const { params, requestBody, result } =
        methods[method as MethodsRouteApi];

      const paramsString = params
        ? JSON.stringify(simplifySchema(params))?.replace(/"/g, "")
        : "null";
      const requestBodyString = requestBody
        ? JSON.stringify(simplifySchema(requestBody))?.replace(/"/g, "")
        : "null";
      const resultString = result
        ? JSON.stringify(simplifySchema(result))?.replace(/"/g, "")
        : "null";

      return `    ${method}: {\n      params: ${paramsString},\n      requestBody: ${requestBodyString},\n      result: ${resultString}\n    }`;
    })
    .join(",\n");
}

export function generateOpenApiClient(
  routesApi: RouteApi,
  interfacesOpenApi: string
): string {
  const apiLiteral = Object.keys(routesApi)
    .map((path) => {
      const methods = routesApi[path];

      return `  "${path}": {\n${generateMethodsString(methods)}\n  }`;
    })
    .join(",\n");

  return `export type Swagger = {\n${apiLiteral}\n};\n\n${interfacesOpenApi}`;
}
