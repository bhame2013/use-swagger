import {
  OperationObject,
  RequestBodyObject,
} from "../openapi-interfaces";

export function getRequestBody(methodInfo: OperationObject) {
  const requestBody = methodInfo?.requestBody as RequestBodyObject;

  const schemaBody = requestBody?.content?.["application/json"]?.schema;
  
  return schemaBody;
}
