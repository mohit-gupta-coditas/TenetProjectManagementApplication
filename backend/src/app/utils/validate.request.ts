import type { NextFunction, Request, Response } from "express";
import type {z, ZodObject  } from "zod";
import type { AnyZodObject } from "zod/v3";
import type { Options } from "../app.types.js";

const check = (type: 'body' | 'query' | 'params') => (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if(type === 'query') {
      req.options = schema.parse(req.query) as Options;
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