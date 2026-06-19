import z from "zod";

export const ZUser = z.object({
  id: z.uuid(),
  name: z.string(`name must be a valid string`).min(1),
  email: z.email(`email must be in valid format`),
  password: z.string(`password must be a valid string`).min(6),
  companyId: z.uuid(`companyId must be a valid uuid`),
  passwordVersion: z.number(`passwordVersion must be a valid number`),
  globalRole: z.enum(['admin' , 'superAdmin' , 'member']),
  isDeleted: z.string().transform( value => {
      if(value === 'true') {
        return true;
      } else if(value === 'false') {
        return false;
      } else {
        throw new Error(`isDeleted must be 'true' or 'false'`);
      }
    }).optional(),
    limit: z.coerce.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.uuid(`createdBy must be a valid uuid`).optional()
});

export const ZUserOptions = z.object({
  search: z.string().optional(),
  isDeleted:z.string().transform( value => {
      if(value === 'true') {
        return true;
      } else if(value === 'false') {
        return false;
      } else {
        throw new Error(`isDeleted must be 'true' or 'false'`);
      }
    }).optional(),
  globalRole: z.enum(['admin','member']).optional(),
  limit: z.coerce.number(`limit must be a valid number`),
  offset: z.coerce.number(`offset must be a valid number`),
  sortBy: z.string().default("email"),
  orderBy: z.enum(["ASC", "DESC"]).default("ASC")
});

export const ZUserUpdate = z.object({
  name: z.string(`'name' must be a valid string`).trim().min(1).optional(),
  email: z.email(`'email' must be a valid format`).optional()
});

export type User = z.infer<typeof ZUser>;

export type UserOptions = z.infer<typeof ZUserOptions>;