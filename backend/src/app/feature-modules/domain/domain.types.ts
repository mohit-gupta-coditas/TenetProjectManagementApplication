import z from "zod";

export const ZDomain = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  companyId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  createdBy: z.string()
});

export type Domain = z.infer<typeof ZDomain>;