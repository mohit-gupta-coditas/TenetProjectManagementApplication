import z from "zod";

export const ZCompany = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  logoUrl: z.string(),
  subscription: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Company = z.infer<typeof ZCompany>;