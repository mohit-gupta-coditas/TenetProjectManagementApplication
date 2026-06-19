import type { Transaction, WhereOptions } from "sequelize";
import type { Domain } from "./domain.types.js";
import { DomainSchema } from "../../connections/associations.js";

const getDomain = (domain: Partial<Domain>) => DomainSchema.findOne({where: domain});

const createDomain = (domain: Pick<Domain, "name" | "companyId" | "createdBy">, transaction?: Transaction) => DomainSchema.create(domain, {transaction: transaction ?? null});

const getAllDomains = (where: WhereOptions<Pick<Domain, "name" | "companyId" >>, limit: number, offset: number, order: any) => DomainSchema.findAll({where, limit, offset, order});

const updateDomain = (domain: Partial<Domain>, id: string) => DomainSchema.update(domain, {where: {id}});

export default {
  getDomain,
  createDomain,
  getAllDomains,
  updateDomain,
}