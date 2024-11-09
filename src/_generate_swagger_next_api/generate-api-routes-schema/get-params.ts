import { OperationObject, ParameterObject, ReferenceObject, SchemaObject } from "@/_generate_swagger/openapi-interfaces";

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

    obj[param.name] = typedParam.properties ? processProperties(typedParam.properties, typedParam.required || []) : formatType(typedParam.type, isRequired) || 'unknown'

    return obj
  }, {})
}

function processProperties(properties: Record<string, ReferenceObject | SchemaObject>, requiredFields: string[] = []): Record<string, any> {
  return Object.entries(properties).reduce((result, [key, value]: any) => {
    const isRequired = requiredFields.includes(key);

    result[key] = value.properties
      ? processProperties(value.properties, value.required || [])
      : formatType(value?.type || value, isRequired) || 'unknown';
    return result;
  }, {} as Record<string, any>);
}

