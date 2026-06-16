import z from "zod";

const envSchema = z.object({
<<<<<<< HEAD
  PORT: z.coerce.number('PORT must be a number'),
  DB_NAME: z.string('DB_NAME must be a valid string'),
  DB_USERNAME: z.string('DB_USERNAME must be a valid string'),
  DB_PASSWORD: z.string('DB_PASSWORD must be a valid string'),
  AWS_REGION: z.string('AWS_REGION must be a valid string'),
  AWS_ACCESS_KEY: z.string('AWS_ACCESS_KEY must be a valid string'),
  AWS_SECRET_ACCESS_KEY: z.string('AWS_SECRET_ACCESS_KEY must be a valid string'),
  SES_SENDER_EMAIL: z.string('SES_SENDER_EMAIL must be a valid string'),
  SQS_QUEUE_URL: z.string('SQS_QUEUE_URL must be a valid string'),
  REDIS_HOST: z.string('REDIS_HOST must be a valid string'),
  REDIS_PORT: z.coerce.number('REDIS_PORT must be a valid string'),
  REDIS_PASSWORD: z.string('REDIS_PASSWORD must be a valid string'),
  REDIS_USERNAME: z.string('REDIS_USERNAME must be a valid string'),
  OTP_TIMER: z.coerce.number('OTP_TIMER must be a number'),
  ACCESS_TOKEN_TIME: z.coerce.number('ACCESS_TOKEN_TIME must be a number'),
  REFRESH_TOKEN_TIME: z.coerce.number('REFRESH_TOKEN_TIME must be a number')
=======
  PORT: z.coerce.number('PORT must be a nubmer'),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  SES_SENDER_EMAIL: z.string(),
  SQS_QUEUE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),
  REDIS_USERNAME: z.string(),
  OTP_TIMER: z.coerce.number(),
  ACCESS_TOKEN_TIME: z.coerce.number(),
  REFRESH_TOKEN_TIME: z.coerce.number()
>>>>>>> b2b21967dba888ce7fa9cf441131bce775102ef1
});

export const env = envSchema.parse(process.env);