import type { SuperAction } from "../../../reducer/superAdminReducer";

export interface SortCompanyFormType{
  sort:string;
}
export interface SortCompanyProps{
  dispatch:React.ActionDispatch<[action: SuperAction]>
}