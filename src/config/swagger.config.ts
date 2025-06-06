import { Application, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/features/auth/routes/*.ts",
    "./src/features/users/routes/*.ts",
    "./src/features/blogs/routes/*.ts",
    "./src/features/supportTickets/routes/*.ts",
    "./src/features/readingList/routes/*.ts",
    "./src/features/favorites/routes/*.ts",
    "./src/features/comments/routes/*.ts",
    "./src/features/interactions/routes/*.ts",
    "./src/features/contentReporting/routes/*.ts",
    "./src/features/analytics/routes/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: number) {
  // Swagger page
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    console.log("Docs in JSON format");
    res.setHeader("Content-Type", "/application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/api/v1/docs`);
}

export default swaggerDocs;
