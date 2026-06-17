import type { WhereOptions } from "sequelize";
import { CompanySchema } from "./company.schema.js";
import type { Company } from "./company.types.js";

const getCompany = (company: Partial<Company>) => CompanySchema.findOne({where: company});

const createCompany = (company: Pick<Company, "name" | "email" | "subscription" | "logoUrl">) => CompanySchema.create(company);

const getAllCompanies = (where: WhereOptions<Company>, limit: number, offset: number, order: any) => CompanySchema.findAll({where, limit, offset, order});

const updateCompany = (company: Partial<Company>, id: string) => CompanySchema.update(company, {where: {id}});

export default {
  getCompany,
  createCompany,
  getAllCompanies,
  updateCompany
}