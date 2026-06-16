import express from "express";
import { env } from "../validate.env.js";
import { connectToPG } from "./connections/pg.connection.js";
import { registerMiddlewares } from "./routes/routes.js";
import { redisSetup } from "./connections/redis.connection.js";

export const startServer = async () => {
  try {
    const app = express();

    await connectToPG();
    await redisSetup();
    registerMiddlewares(app);

    app.listen(
      env.PORT,
      () => {
        console.log(`Server started at PORT : ${env.PORT}`);
      }
    )
  } catch(err) {
    console.error(err);
    process.nextTick(() => process.exit(1));
  }
}