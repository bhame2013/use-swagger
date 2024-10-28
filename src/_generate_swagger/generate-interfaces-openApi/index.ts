import { OpenAPIObject, SchemaObject } from '../openapi-interfaces'

const mapOpenApiTypeToTS = (prop, array) => {
  if ((array && prop.$ref) || prop?.$ref) {
    return prop.$ref.replace('#/components/schemas/', '')
  }

  switch (prop.type) {
    case 'string':
      return 'string'
    case 'integer':
      return 'number'
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'array':
      return `${mapOpenApiTypeToTS(prop.items, true)}[]`
    case 'object':
      return 'Record<string, any>'
    default:
      if (prop?.allOf?.[0]?.['$ref']) {
        const name = prop.allOf[0]['$ref'].replace('#/components/schemas/', '')
        return name
      }
      return 'any'
  }
}

export function generateInterfacesOpenApi(openApiDocument: OpenAPIObject) {
  const schemas = openApiDocument.components.schemas

  return Object.keys(schemas)
    .map((schemaName) => {
      const schema = schemas[schemaName] as SchemaObject
      const properties = schema.properties || {}
      const required = schema.required || []

      const propertiesLines = Object.keys(properties)
        .map((propName) => {
          const prop = properties[propName]
          const tsType = mapOpenApiTypeToTS(prop, false)
          const isRequired = required.includes(propName) ? '' : '?'

          return `  ${propName}${isRequired}: ${tsType};`
        })
        .join('\n')

      return `export interface ${schemaName} {\n${propertiesLines}\n}`
    })
    .join('\n\n')
}
