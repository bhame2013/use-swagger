import { OpenAPIObject } from './openapi-interfaces'

import { generateOpenApiClient } from './generate-openApi-client'
import { generateInterfacesOpenApi } from './generate-interfaces-openApi'
import { generateApiRoutesSchema } from '_generate_swagger/generate-api-routes-schema/index'

export async function generateSwaggerTypes({
  fs,
  fsPath = './swagger_client.ts',
  swaggerUrl,
  openApiDocument,
}: {
  fs: any,
  fsPath?: string
  openApiDocument?: OpenAPIObject
  swaggerUrl?: string
}) {
  let openApiDocumentFinal = openApiDocument

  if (!openApiDocument && !swaggerUrl) {
    throw new Error('Either openApiDocument or swaggerUrl must be provided.')
  }

  if (swaggerUrl) {
    if (swaggerUrl.startsWith('http://') || swaggerUrl.startsWith('https://')) {
      const response = await fetch(swaggerUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch Swagger document: ${response.statusText}`)
      }
      openApiDocumentFinal = await response.json()
    } else {
      openApiDocumentFinal = JSON.parse(fs.readFileSync(swaggerUrl, 'utf-8'))
    }
  }

  const apiRoutesSchema = generateApiRoutesSchema(openApiDocumentFinal)

  const interfacesOpenApi = generateInterfacesOpenApi(openApiDocumentFinal)

  const combinedOutput = generateOpenApiClient(apiRoutesSchema, interfacesOpenApi)

  fs.writeFileSync(fsPath, combinedOutput, 'utf-8')
}
