import z from "zod";

export const ZDomain = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  companyId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  createdBy: z.uuid()
});

export const ZDomainOptions = z.object({
  isDeleted: z.string().transform( value => {
    if(value === 'true') {
      return true;
    } else if(value === 'false') {
      return false;
    } else {
      throw new Error(`isDeleted must be 'true' or 'false'`);
    }
  }).optional(),
  limit: z.coerce.number(`"limit" must be a number`),
  offset: z.coerce.number(`"offset" must be a number`),
  sortBy: z.string().default("name"),
  orderBy: z.enum(["ASC", "DESC"]).default("ASC")
});

export type DomainOptions = z.infer<typeof ZDomainOptions>;

export type Domain = z.infer<typeof ZDomain>;