import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Payload } from "../app.types.js";

export const signToken = (payload: Payload, secret_key: string, time: number) => {
  return jwt.sign(
    payload,
    secret_key,
    {
      expiresIn: time,
      algorithm: 'RS256'
    }
  )
};

export const verifyToken = (token: string, secret_key: string) => {
  return jwt.verify(
    token, 
    secret_key,
    {
      algorithms: ['RS256']
    }
  ) as JwtPayload
}

export const decodeToken = (token: string) => {
  return jwt.decode(token);
}