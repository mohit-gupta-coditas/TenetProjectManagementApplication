import jwt from "jsonwebtoken";

export const signToken = (payload: string, secret_key: string, time: number) => {
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
  )
}