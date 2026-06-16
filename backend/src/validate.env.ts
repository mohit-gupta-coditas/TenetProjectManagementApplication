import z from "zod";

const envSchema = z.object({
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
  OTP_TIMER: z.coerce.number()
});

export const env = envSchema.parse(process.env);