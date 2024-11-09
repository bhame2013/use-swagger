import { OpenAPIObject, ReferenceObject, SchemaObject } from '@/_generate_swagger/openapi-interfaces'
import { RouteApi, MethodsRouteApi } from '@/_generate_swagger_next_api/generate-api-routes-schema/interfaces'

function simplifySchema(
  schema: SchemaObject | ReferenceObject,
  noMappedImports: string[],
  openApi: OpenAPIObject,
): any {
  if ((schema as any)?.['$ref']) {
    const referenceObject = schema as ReferenceObject

    const type = referenceObject['$ref'].replace('#/components/schemas/', '')

    if (!openApi.components.schemas?.[type]) {
      noMappedImports.push(type)
    }

    return type
  }

  const schemaObject = schema as SchemaObject

  if (schemaObject.type === 'array' && 'items' in schema) {
    return `${simplifySchema(schema.items, noMappedImports, openApi)}[]`
  }

  if (schemaObject.type === 'object' && schemaObject.properties) {
    return Object.entries(schemaObject.properties).reduce((acc, [key, value]) => {
      acc[key] = simplifySchema(value, noMappedImports, openApi)
      return acc
    }, {} as Record<string, any>)
  }

  if (schemaObject.format === 'date-time') return 'Date'

  return schemaObject
}

function generateMethodsString(
  methods: RouteApi[MethodsRouteApi],
  noMappedImports: string[],
  openApi: OpenAPIObject,
): string {
  return Object.keys(methods)
    .map((method) => {
      const { params, requestBody, result } = methods[method as MethodsRouteApi]

      const paramsString = params
        ? JSON.stringify(simplifySchema(params, noMappedImports, openApi))?.replace(/"/g, '')
        : 'null'

      const requestBodyString = requestBody
        ? JSON.stringify(simplifySchema(requestBody, noMappedImports, openApi))?.replace(/"/g, '')
        : 'null'
      const resultString = result
        ? JSON.stringify(simplifySchema(result, noMappedImports, openApi))?.replace(/"/g, '')
        : 'null'

      return `    ${method}: {\n      params: ${paramsString},\n      requestBody: ${requestBodyString},\n      result: ${resultString}\n    }`
    })
    .join(',\n')
}

export function generateOpenApiClient(routesApi: RouteApi, imports: string, openApi: OpenAPIObject): string {
  let noMappedImports = []

  const apiLiteral = Object.keys(routesApi)
    .map((path) => {
      const methods = routesApi[path]

      return `  "${path}": {\n${generateMethodsString(methods, noMappedImports, openApi)}\n  }`
    })
    .join(',\n')

  const noMappedImportsReduced = noMappedImports.reduce((r, item) => (r ? r + ',' : '') + item, '')

  return `import {${
    imports + (noMappedImportsReduced && noMappedImportsReduced.length > 0 ? ',' + noMappedImportsReduced : '')
  }} from "@/back-end" \n\n export type Swagger = {\n${apiLiteral}\n};`
}
