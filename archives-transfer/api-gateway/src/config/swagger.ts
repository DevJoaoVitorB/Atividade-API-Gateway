import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API REST - Files Service",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes/files.routes.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}