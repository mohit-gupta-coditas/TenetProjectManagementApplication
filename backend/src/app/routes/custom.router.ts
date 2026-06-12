import { Router, type RequestHandler } from "express"

export const customRouter = () => {
  const router = Router();

  const constructMethods = (type: 'get' | 'post' | 'put' | 'patch' | 'delete') => (path: string, auth: {isPublic: false}, ...handlers : RequestHandler[]) => {
    const middlewares = [];
    if(!auth.isPublic) 
    router.use(path, )
  }
}