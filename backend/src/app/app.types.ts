import z from "zod";

type GLOBAL_ROLE = 'superAdmin' | 'admin' | 'member';

export interface Payload{
  userId: string;
  companyId: string;
  globalRole: GLOBAL_ROLE,
  passwordVersion?: number
}

export const ZOptions = z.object({
  isDeleted: z.string().transform(value => {
      if(value === 'true') {
        return true;
      } else if(value === 'false') {
        return false;
      } else {
        throw new Error(`'isDeleted' value should be either 'true' or 'false'`)
      }
    }).optional(),
  limit: z.coerce.number(`limit must be a valid number`).default(10),
  offset: z.coerce.number(`offset must be a valid number`).default(0),
  sortBy: z.string().default("name"),
  orderBy: z.enum(["ASC", "DESC"]).default("ASC")
});

export type Options = z.infer<typeof ZOptions>;