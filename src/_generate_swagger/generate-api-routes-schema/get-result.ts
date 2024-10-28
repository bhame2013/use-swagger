import {
  OperationObject,
  ReferenceObject,
  ResponseObject,
} from "../openapi-interfaces";

export function getResult(methodInfo: OperationObject) {
  const responses = methodInfo?.responses;
  const content = responses["200"] as ResponseObject | ReferenceObject;

  const responseObject = content as ResponseObject;

  const schema = responseObject?.content?.["application/json"].schema;

  return schema;
}
