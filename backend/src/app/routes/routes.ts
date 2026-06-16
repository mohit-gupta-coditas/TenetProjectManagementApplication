import { json, type Application, type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { routes } from "./routes.data.js";
import { ResposneHandler } from "../utils/response.handler.js";
import cors from "cors";

export const registerMiddlewares = (app : Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(json());

  for(const route of routes) {
    app.use(route.path, route.router);
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResposneHandler(null, err));
  })
}