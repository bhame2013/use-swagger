import { OperationObject, ParameterObject, SchemaObject } from '../openapi-interfaces'

function formatType(type: string) {
  switch (type) {
    case 'integer':
      return 'number'
    default: return type
  }
}

export function getParams(methodInfo: OperationObject) {
  const params = methodInfo?.parameters || []

  return params.reduce((obj, param: any) => {

    const paramObject = param as ParameterObject

    const typedParam = paramObject?.schema as SchemaObject

    obj[param.name] = formatType(typedParam.type) || 'unknown'

    return obj
  }, {})
}
