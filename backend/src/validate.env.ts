import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number('PORT must be a number'),
  DB_NAME: z.string('DB_NAME must be a valid string').trim().min(1),
  DB_USERNAME: z.string('DB_USERNAME must be a valid string').trim().min(1),
  DB_PASSWORD: z.string('DB_PASSWORD must be a valid string').trim().min(1),
  AWS_REGION: z.string('AWS_REGION must be a valid string').trim().min(1),
  AWS_ACCESS_KEY: z.string('AWS_ACCESS_KEY must be a valid string').trim().min(1),
  AWS_SECRET_ACCESS_KEY: z.string('AWS_SECRET_ACCESS_KEY must be a valid string').trim().min(1),
  SES_SENDER_EMAIL: z.string('SES_SENDER_EMAIL must be a valid string').trim().min(1),
  SQS_QUEUE_URL: z.string('SQS_QUEUE_URL must be a valid string').trim().min(1),
  REDIS_HOST: z.string('REDIS_HOST must be a valid string').trim().min(1),
  REDIS_PORT: z.coerce.number('REDIS_PORT must be a valid string'),
  REDIS_PASSWORD: z.string('REDIS_PASSWORD must be a valid string').trim().min(1),
  REDIS_USERNAME: z.string('REDIS_USERNAME must be a valid string').trim().min(1),
  OTP_TIMER: z.coerce.number('OTP_TIMER must be a number'),
  ACCESS_TOKEN_TIME: z.coerce.number('ACCESS_TOKEN_TIME must be a number'),
  REFRESH_TOKEN_TIME: z.coerce.number('REFRESH_TOKEN_TIME must be a number'),
  AWS_S3_BUCKET_NAME: z.string('Name must be a valid string')
});

export const env = envSchema.parse(process.env);