import { ResponseFormat } from "../../utils/response.format.js";

export const AUTH_RESPONSE : Record<
'TOKEN_NOT_FOUND' |
'INVALID_TOKEN' | 
'OTP_SENT' |
'OTP_INVALID' |
'OTP_EXPIRED' |
'LOGIN_SUCCESSFULL' |
'PASSWORD_SET' |
'CANNOT_SET_PASSWORD'
, ResponseFormat> = {
  TOKEN_NOT_FOUND: new ResponseFormat(404, 'TOKEN NOT FOUND'),
  INVALID_TOKEN: new ResponseFormat(400, 'INVALID TOKEN'),
  OTP_SENT: new ResponseFormat(200, 'OTP SENT'),
  OTP_INVALID: new ResponseFormat(400, 'OTP INVALID'),
  OTP_EXPIRED: new ResponseFormat(400, 'OTP EXPIRED'),
  LOGIN_SUCCESSFULL: new ResponseFormat(200, 'LOGIN SUCCESSFULL'),
  PASSWORD_SET: new ResponseFormat(200, 'PASSWORD SET SUCCESSFULLY'),
  CANNOT_SET_PASSWORD: new ResponseFormat(400, 'CANNOT SET PASSWORD')
}