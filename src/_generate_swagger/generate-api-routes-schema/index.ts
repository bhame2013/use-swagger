import {
  OpenAPIObject,
  PathItemObject,
  OperationObject,
} from "../openapi-interfaces";

import { RouteApi } from "./interfaces";
import { getParams } from "./get-params";
import { getResult } from "./get-result";
import { getRequestBody } from "./get-request-body";

function getMethodsList(methods: PathItemObject) {
  return Object.keys(methods).reduce((reducerMethod, method) => {
    const methodInfo = methods[method] as OperationObject;

    const params = getParams(methodInfo);
    const result = getResult(methodInfo);
    const requestBody = getRequestBody(methodInfo);

    const methodData = {
      [method]: {
        params,
        requestBody,
        result,
      },
    };

    return {
      ...reducerMethod,
      ...methodData,
    };
  }, {});
}

export function generateApiRoutesSchema(openApiDocument: OpenAPIObject) {
  const paths = openApiDocument.paths;

  const apiRoutes = Object.keys(paths).reduce((reducer, path) => {
    const methods = paths[path];
    const methodsList = getMethodsList(methods);

    return {
      ...reducer,
      [path]: methodsList,
    };
  }, {});

  return apiRoutes as RouteApi;
}
