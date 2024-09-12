import { Router } from "express";
import swaggerUi from "swagger-ui-express";

export class SwaggerRoutes {
  static get routes(): Router {
    const router = Router();

    router.get(
      "/",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );

    return router;
  }
}
