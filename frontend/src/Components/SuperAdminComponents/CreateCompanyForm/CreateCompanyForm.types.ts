import type { SuperAction } from "../../../reducer/superAdminReducer";

export interface CompanyFormType{
  companyName:string;
  companyLogo:File;
  adminMail:string;
  subscription:string;
}

export interface CreateCompanyProps{
  dispatch:React.ActionDispatch<[action: SuperAction]>
}