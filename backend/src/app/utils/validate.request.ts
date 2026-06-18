import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

const check = (type: 'body' | 'query' | 'params') => (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if(type === 'query') {
      console.log(req.query.isDeleted);
      req.options = schema.parse(req.query);
      console.log(req.options.isDeleted);
    } else {
      req[type] = schema.parse(req[type]);
    }
    next();
  } catch(err: any) {
    throw {message: 'BAD REQUEST', errors: err.issues}
  }
}

export const body = check('body');
export const query = check('query');
export const params = check('params');