import { ResponseFormat } from "../../utils/response.format.js";

export const DOMAIN_RESPONSE : Record<
  "DOMAIN_FOUND" | 
  "DOMAIN_NOT_FOUND" |
  "DOMAIN_CREATED" |
  "DOMAIN_NOT_CREATED" |
  "DOMAIN_UPDATED" | 
  "DOMAIN_NOT_UPDATED" |
  "DOMAIN_DELETED" |
  "DOMAIN_NOT_DELETED" |
  "DOMAIN_ALREADY_EXISTS"
, ResponseFormat> = {
  DOMAIN_FOUND: new ResponseFormat(200, "DOMAIN FOUND"),
  DOMAIN_NOT_FOUND: new ResponseFormat(404, "DOMAIN NOT FOUND"),
  DOMAIN_CREATED: new ResponseFormat(201, "DOMAIN CREATED"),
  DOMAIN_NOT_CREATED: new ResponseFormat(400, "DOMAIN NOT CREATED"),
  DOMAIN_UPDATED: new ResponseFormat(200, "DOMAIN UPDATED"),
  DOMAIN_NOT_UPDATED: new ResponseFormat(400, "DOMAIN NOT UPDATED"),
  DOMAIN_DELETED: new ResponseFormat(200, "DOMAIN DELETED"),
  DOMAIN_NOT_DELETED: new ResponseFormat(400, "DOMAIN NOT DELETED"),
  DOMAIN_ALREADY_EXISTS: new ResponseFormat(400, "DOMAIN ALREADY EXISTS")
}