import type { NextFunction, Request, Response } from "express";
import { AUTH_RESPONSE } from "./auth.response.js";
import { verifyToken } from "../../utils/jwt.helper.js";
import { publicKey } from "../../utils/jwt.keys.js";

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]?.toString();
    if(!token) throw AUTH_RESPONSE.TOKEN_NOT_FOUND;

    const decoded = verifyToken(token, publicKey);

    req.payload = {
      userId: decoded.userId,
      companyId: decoded.companyId,
      globalRole: decoded.globalRole
    }
    
    next();
  } catch(err) {
    console.log(err);
    next(err);  
  }
}