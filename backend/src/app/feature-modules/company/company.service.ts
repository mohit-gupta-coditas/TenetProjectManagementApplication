import userService from "../user/user.service.js";
import companyRepo from "./company.repo.js";
import { COMPANY_RESPONSE } from "./company.response.js";
import type { Company, CompanyOptions } from "./company.types.js";
import { sequelize } from "../../connections/pg.connection.js";
import domainService from "../domain/domain.service.js";
import { Op, type WhereOptions } from "sequelize";
import { getPresignedURL, sendToSQS } from "../../utils/aws.helper.js";
import { env } from "../../../validate.env.js";
import { signToken } from "../../utils/jwt.helper.js";
import { privateKey } from "../../utils/jwt.keys.js";

const getCompany = async (company: Partial<Company>) => {
  try {
    const oldCompany = await companyRepo.getCompany(company);
    if(!oldCompany) throw COMPANY_RESPONSE.COMPANY_NOT_FOUND;

    oldCompany.logoUrl = await getPresignedURL(oldCompany.logoUrl);

    return oldCompany;
  } catch(err) {
    throw err;
  }
}

const createCompany = async (company: Pick<Company, "name" | "email" | "subscription">, logoUrl: string, createdBy: string) => {
  try {
    await sequelize.transaction(async t => {
      const newCompany = await companyRepo.createCompany({...company, logoUrl}, t);
      await userService.createUser({
        email: company.email,
        companyId: newCompany.id,
        createdBy
      }, t);
      await domainService.createDomain({
        name: company.email.split('@')[1] as string,
        companyId: newCompany.id,
        createdBy
      }, t);
    });

    const user = await userService.getUser({email: company.email});

    const token = signToken({
        userId: user.id,
        companyId: user.companyId,
        globalRole: user.globalRole,
        passwordVersion: user.passwordVersion
      },
      privateKey,
      env.PASSWORD_TOKEN_TIME
    );

    await sendToSQS({
      sender_email: env.SES_SENDER_EMAIL,
      to_email: company.email,  
      subject: 'TENET INVITATION',
      message: `Welcome to TENET\n
      You have been invited as ADMIN\n
      please click on this link to set password\n
      ${env.SET_PASSWORD_LINK}/${token}
      `
    });


    return COMPANY_RESPONSE.COMPANY_CREATED;
  } catch(err) {
    console.log(err);
    throw COMPANY_RESPONSE.COMPANY_NOT_CREATED;
  }
}

const getAllCompanies = async (options: CompanyOptions) => {
  try {
    const where: WhereOptions<Company> = {};
    const limit = options.limit ?? 10;
    const offset = options.offset ?? 0;
    const order : any = [[]];

    if(options.search) {
      where[Op.or as any] = {
        name: {
          [Op.like] : `%${options.search}%`
        },
        email: {
          [Op.like] : `%${options.search}%`
        }
      }
    }

    if(options.subscription) {
      where.subscription = {
        [Op.eq] : options.subscription
      }
    }
    
    where.isDeleted = {
      [Op.eq] : (options.isDeleted === true) ? true : false
    }

    if(options.orderBy) {
      order[0]?.push(options.sortBy, options.orderBy)
    }
    
    const allCompanies = await companyRepo.getAllCompanies(where, limit, offset, order);
    return allCompanies;
  } catch(err) {
    throw err;
  }
}

const updateCompany = async (company: Partial<Company>, id: string) => {
  try {
    const oldCompany = await companyRepo.getCompany({id});
    if(!oldCompany) throw COMPANY_RESPONSE.COMPANY_NOT_FOUND;

    const isUpdated = await companyRepo.updateCompany(company, id);
    if(!isUpdated) throw COMPANY_RESPONSE.COMPANY_NOT_UPDATED;

    return COMPANY_RESPONSE.COMPANY_UPDATED;
  } catch(err) {
    throw err;
  }
}

const deleteCompany = async (id: string) => {
  try {
    const oldCompany = await companyRepo.getCompany({id});
    if(!oldCompany) throw COMPANY_RESPONSE.COMPANY_NOT_FOUND;

    const isUpdated = await companyRepo.updateCompany({isDeleted: true}, id);
    if(!isUpdated) throw COMPANY_RESPONSE.COMPANY_NOT_DELETED;

    return COMPANY_RESPONSE.COMPANY_DELETED;
  } catch(err) {
    throw err;
  }
}

export default{
  getCompany,
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany
}