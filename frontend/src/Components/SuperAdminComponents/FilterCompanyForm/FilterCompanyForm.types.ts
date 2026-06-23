import type { SuperAction } from "../../../reducer/superAdminReducer";

export interface FilterCompanyFormType{
  filter:string;
}
export interface FilterCompanyProps{
  dispatch:React.ActionDispatch<[action: SuperAction]>
}