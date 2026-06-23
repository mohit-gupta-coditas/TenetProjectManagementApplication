import z from "zod";

export const ZLogin = z.object({
  email: z.string(),
  otp: z.coerce.number()
});

export const ZPassword = z.object({
  password: z.string().min(4)
})