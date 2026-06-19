import type { NextFunction, Request, Response } from "express";
import { AUTH_RESPONSE } from "./auth.response.js";
import { decodeToken, verifyToken } from "../../utils/jwt.helper.js";
import { publicKey } from "../../utils/jwt.keys.js";
import userService from "../user/user.service.js";

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
    next(err);  
  }
}

export const passwordAuth = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]?.toString();
    if(!token) throw AUTH_RESPONSE.TOKEN_NOT_FOUND;

    const decoded = verifyToken(token, publicKey);

    const user = await userService.getUser({id: decoded.userId});

    req.payload = {
      userId: decoded.userId,
      companyId: decoded.companyId,
      globalRole: decoded.globalRole
    }

    if(user.passwordVersion !== decoded.passwordVersion) {
      throw AUTH_RESPONSE.INVALID_TOKEN;
    }

    next();
  } catch(err) {
    next(err);
  }
}