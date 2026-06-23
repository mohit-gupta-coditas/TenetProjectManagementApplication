import z from "zod";
import { ZOptions } from "../../app.types.js";

export const ZDomain = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  companyId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  createdBy: z.uuid()
});

export const ZDomainOptions = ZOptions;

export type DomainOptions = z.infer<typeof ZDomainOptions>;

export type Domain = z.infer<typeof ZDomain>;