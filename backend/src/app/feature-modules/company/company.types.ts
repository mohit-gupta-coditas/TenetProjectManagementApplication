import z from "zod";

export const ZCompany = z.object({
  id: z.uuid(),
  name: z.string(`'name' must be a valid string`).trim().min(1),
  email: z.string(`'email' must be in valid format`),
  logoUrl: z.string(`'logoUrl' must be a valid string`).trim().min(1),
  subscription: z.enum(['full', 'half', 'basic']),
  isDeleted: z.string().transform(value => {
    if(value === 'true') {
      return true;
    } else if(value === 'false') {
      return false;
    } else {
      throw new Error(`'isDeleted' value should be either 'true' or 'false'`)
    }
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const ZCompanyOptions = z.object({
  search: z.string(`'search' value must not be empty`).optional(),
  subscription: z.enum(['full', 'half', 'basic']).optional(),
  isDeleted: z.string().transform(value => {
    if(value === 'true') {
      return true;
    } else if(value === 'false') {
      return false;
    } else {
      throw new Error(`'isDeleted' value should be either 'true' or 'false'`)
    }
  }),
  limit: z.coerce.number(`'limit' must be a valid number`),
  offset: z.coerce.number(`'offset' must be a valid number`),
  sortBy: z.string().default("name"),
  orderBy: z.enum(["ASC", "DESC"]).default("ASC")
});

export const ZCompanyUpdate = z.object({
  name: z.string(`'name' must be a valid string`).trim().min(1).optional(),
  email: z.email(`email must be in valid format`).optional(),
  subscription: z.enum(['superAdmin', 'admin', 'member']).optional()
});

export type Company = z.infer<typeof ZCompany>;

export type CompanyOptions = z.infer<typeof ZCompanyOptions>;