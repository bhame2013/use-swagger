import { generateOpenApiClient } from './generate-openApi-client'
import { generateImports } from './generate-interfaces-openApi'
import { generateApiRoutesSchema } from '@/_generate_swagger_next_api/generate-api-routes-schema/index'
import { OpenAPIObject } from '@/_generate_swagger/openapi-interfaces'

export async function generateSwaggerTypesNextJs({
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

  const imports = generateImports(openApiDocumentFinal)

  const apiRoutesSchema = generateApiRoutesSchema(openApiDocumentFinal)

  const combinedOutput = generateOpenApiClient(apiRoutesSchema, imports, openApiDocumentFinal)

  fs.writeFileSync(fsPath, combinedOutput, 'utf-8')
}
