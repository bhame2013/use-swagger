const fs = require("fs");
const { generateSwaggerTypesNextJs } = require("./_generate_swagger_next_api");

const openApiDocument = require("./swagger.json")

generateSwaggerTypesNextJs({ fs, openApiDocument  })
