import { Op, Transaction, type WhereOptions } from "sequelize";
import domainRepo from "./domain.repo.js";
import { DOMAIN_RESPONSE } from "./domain.response.js";
import type { Domain, DomainOptions } from "./domain.types.js";

const getDomain = async (domain: Partial<Domain>) => {
  try {
    const oldDomain = await domainRepo.getDomain(domain);
    if(!oldDomain) throw DOMAIN_RESPONSE.DOMAIN_NOT_FOUND;
    return oldDomain;
  } catch(err) {
    throw err;
  }
}

const createDomain = async (domain: Pick<Domain, "name" | "companyId" | "createdBy">, transaction?: Transaction) => {
  try {
    await domainRepo.createDomain(domain, transaction);
    return DOMAIN_RESPONSE.DOMAIN_CREATED;
  } catch(err) {
    throw err;
  }
}

const getAllDomain = async (options: DomainOptions, companyId: string)=> {
  try {
    const where: WhereOptions<Domain> = {};
    const limit = options.limit ?? 10;
    const offset = options.offset ?? 0;
    const order:any = [[]];
    
    where.companyId = {
      [Op.eq] : companyId
    }

    where.isDeleted = {
      [Op.eq] : (options.isDeleted === true) ? true : false
    }
    
    if(options.orderBy) {
      order[0].push(options.sortBy, options.orderBy);
    }

    const alldomains = await domainRepo.getAllDomains(where, limit, offset, order);
    return alldomains;
  } catch(err) {
    throw err;
  }
}

const updateDomain = async (domain: Partial<Domain>, domainId: string) => {
  try {
    const oldDomain = await domainRepo.getDomain({id: domainId});
    if(!oldDomain) throw DOMAIN_RESPONSE.DOMAIN_NOT_FOUND;

    const isUpdated = await domainRepo.updateDomain(domain, domainId);
    if(!isUpdated) throw DOMAIN_RESPONSE.DOMAIN_NOT_UPDATED;
    return DOMAIN_RESPONSE.DOMAIN_UPDATED;
  } catch(err) {
    throw err;
  }
}

const deleteDomain = async (domainId: string) => {
  try {
    const oldDomain = await domainRepo.getDomain({id: domainId});
    if(!oldDomain) throw DOMAIN_RESPONSE.DOMAIN_NOT_FOUND;

    const isUpdated = await domainRepo.updateDomain({isDeleted: true}, domainId);
    if(!isUpdated) throw DOMAIN_RESPONSE.DOMAIN_NOT_DELETED;

    return DOMAIN_RESPONSE.DOMAIN_DELETED;
  } catch(err) {
    throw err;
  }
}

export default {
  getDomain,
  createDomain,
  getAllDomain,
  updateDomain,
  deleteDomain
}