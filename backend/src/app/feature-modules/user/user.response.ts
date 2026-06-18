import { ResponseFormat } from "../../utils/response.format.js";

export const USER_RESPONSE : Record<
"USER_NOT_FOUND" |
"USER_ALREADY_EXISTS" |
"USER_CREATED" |
"USER_NOT_CREATED" |
"USER_FOUND" |
"USER_UPDATED" |
"USER_NOT_UPDATED" |
"USER_DELETED" |
"USER_NOT_DELETED"
, ResponseFormat> = {
  USER_NOT_FOUND: new ResponseFormat(404, 'USER NOT FOUND'),
  USER_ALREADY_EXISTS : new ResponseFormat(400, 'USER ALREADY EXISTS'),
  USER_CREATED: new ResponseFormat(201, 'USER CREATED'),
  USER_NOT_CREATED: new ResponseFormat(400, 'USER NOT CREATED'),
  USER_FOUND: new ResponseFormat(200, 'USER FOUND'),
  USER_UPDATED: new ResponseFormat(200, 'USER UPDATED'),
  USER_NOT_UPDATED: new ResponseFormat(400, 'USER NOT UPDATED'),
  USER_DELETED: new ResponseFormat(200, 'USER DELETED'),
  USER_NOT_DELETED: new ResponseFormat(400, 'USER NOT DELETED')
}