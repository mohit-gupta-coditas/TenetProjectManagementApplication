import { s3Client } from "../../connections/aws.connection.js";
import companyRepo from "./company.repo.js";
import { COMPANY_RESPONSE } from "./company.response.js";
import type { Company } from "./company.types.js";

const getCompany = async (company: Partial<Company>) => {
  try {
    const oldCompany = await companyRepo.getCompany(company);
    if(!oldCompany) throw COMPANY_RESPONSE.COMPANY_NOT_FOUND;

    return {...COMPANY_RESPONSE.COMPANY_FOUND, company: oldCompany};
  } catch(err) {
    throw err;
  }
}

const createCompany = async (company: Pick<Company, "name" | "email" | "subscription">, file: string) => {
  try {
    
  } catch(err) {
    throw err;
  }
}

export default{
  getCompany
}