import { OpenAPIObject } from "@/_generate_swagger/openapi-interfaces"


export function generateImports(openApiDocument: OpenAPIObject) {
  const schemas = openApiDocument?.components?.schemas

  const imports =  Object.keys(schemas || {})
    .reduce((reducer, schemaName) => {

      return  ((reducer ? (reducer + ",") : "") + schemaName)
    }, "")
   

    return imports
}
