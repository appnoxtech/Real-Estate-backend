import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import yaml from 'yamljs';
import path from 'path';

// Load the YAML file
const swaggerYamlPath = path.resolve(__dirname, '../../swagger.yml');
const swaggerYamlContent = yaml.load(swaggerYamlPath);

// Combine all Swagger options, including the loaded YAML content
const swaggerOptions: Options = {
  definition: {
    ...swaggerYamlContent,
  },
  apis: [
    './src/modules/users/routes/userRoutes.ts',
    './src/modules/properties/routes/propRoutes.ts',
    './src/modules/favourite_property/routes/favouriteRoutes.ts',
    './src/modules/ratings/routes/ratingRoutes.ts',
    './src/modules/documentsUpload/routes/documentsUpload.ts',
    './src/modules/responses/routes/feedback_routes.ts',
    './src/modules/responses/routes/terms_routes.ts',
  ],
};

// Generate the Swagger specification
const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
