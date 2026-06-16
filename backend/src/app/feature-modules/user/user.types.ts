import z from "zod";

export const ZUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  companyId: z.string(),
  passwordVersion: z.number(),
  globalRole: z.string(),
  isDeleted: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional()
});

export type User = z.infer<typeof ZUser>;