import type { Transaction, WhereOptions } from "sequelize";
import { CompanySchema } from "./company.schema.js";
import type { Company } from "./company.types.js";

const getCompany = (company: Partial<Company>) => CompanySchema.findOne({where: company});

const createCompany = (company: Pick<Company, "name" | "email" | "subscription" | "logoUrl">, transaction: Transaction) => CompanySchema.create(company, {transaction : transaction ?? null});

const getAllCompanies = (where: WhereOptions<Pick<Company, "email" | "name" | "subscription">>, limit: number, offset: number, order: any) => CompanySchema.findAll({where, limit, offset, order});

const updateCompany = (company: Partial<Company>, id: string) => CompanySchema.update(company, {where: {id}});

export default {
  getCompany,
  createCompany,
  getAllCompanies,
  updateCompany
}