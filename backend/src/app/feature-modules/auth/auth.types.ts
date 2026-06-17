import z from "zod";

export const ZLogin = z.object({
  email: z.string(),
  otp: z.coerce.number()
});