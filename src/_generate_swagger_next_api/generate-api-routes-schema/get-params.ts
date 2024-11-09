import { OperationObject, ParameterObject, SchemaObject } from "@/_generate_swagger/openapi-interfaces";

function formatType(type: string, isRequired: boolean) {
  switch (type) {
    case 'integer':
      return 'number';
    case "any":
      return "any"
    default:
      return isRequired ? type : `${type} | undefined`; 
  }
}
export function getParams(methodInfo: OperationObject) {
  const params = methodInfo?.parameters || []

  return params.reduce((obj, param: any) => {

    const paramObject = param as ParameterObject

    const typedParam = paramObject?.schema as SchemaObject

    const isRequired = paramObject.required ?? false; 

    obj[param.name] = formatType(typedParam.type, isRequired) || 'unknown'

    return obj
  }, {})
}
