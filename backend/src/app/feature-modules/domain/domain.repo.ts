import type { WhereOptions } from "sequelize";
import { DomainSchema } from "./domain.schema.js";
import type { Domain } from "./domain.types.js";

const getDomain = (domain: Partial<Domain>) => DomainSchema.findOne({where: domain});

const createDomain = (domain: Pick<Domain, "name" | "companyId" | "createdBy">) => DomainSchema.create(domain);

const getAllDomains = (where: WhereOptions<Pick<Domain, "name" | "companyId">>, limit: number, offset: number, order: any) => DomainSchema.findAll({where, limit, offset, order});

const updateDomain = (domain: Partial<Domain>, id: string) => DomainSchema.update(domain, {where: {id}});

const deleteDomain = (id: string) => DomainSchema.destroy({where: {id}});

export default {
  getDomain,
  createDomain,
  getAllDomains,
  updateDomain,
  deleteDomain
}