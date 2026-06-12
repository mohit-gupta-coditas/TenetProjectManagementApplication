import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number('PORT must be a nubmer'),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string()
});

const validateLogin = z.object({
  email : z.email(),
  password: z.string()
});

export const env = envSchema.parse(process.env);