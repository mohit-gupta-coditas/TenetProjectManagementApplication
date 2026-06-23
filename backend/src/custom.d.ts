import type { Options, Payload } from "./app/app.types.ts";

declare global {
  namespace Express {
    interface Request {
      payload : Payload,
      options: Options
    }
  }
}