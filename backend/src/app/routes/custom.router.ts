import { Router, type RequestHandler } from "express"
import { authMiddleware } from "../feature-modules/auth/auth.middleware.js";
import { Route } from "./routes.types.js";

export const customRouter = () => {
  const router = Router();

  const constructMethods = (type: 'get' | 'post' | 'put' | 'patch' | 'delete') => (path: string, auth: {isPublic?: true}, ...handlers : RequestHandler[]) => {
    const middlewares = [];
    if(!auth.isPublic) middlewares.push(authMiddleware);
    middlewares.push(...handlers);
    router[type](path, ...middlewares);
  }

  return {
    get : constructMethods('get'),
    post : constructMethods('post'),
    put : constructMethods('put'),
    patch : constructMethods('patch'),
    delete : constructMethods('delete'),
    setRouter : (path: string) => new Route(path, router)
  };
}