export interface StateType{
  companyModal:boolean;
  sortModal:boolean;
  filterModal:boolean;
}

export const initialStateSA:StateType={
  companyModal:false,
  sortModal:false,
  filterModal:false
}

export type SuperAction=|{type:"COMPANY_MODAL"; status:boolean}|{type:"SORT_MODAL";status:boolean}|{type:"FILTER_MODAL";status:boolean}

export const superAdminReducer=(state:StateType,action:SuperAction)=>{
 switch(action.type){
  case "COMPANY_MODAL":
    return {
      ...state,
      companyModal:action.status
    }
  case "SORT_MODAL":
    return {
      ...state,
      sortModal:action.status
    }
  case "FILTER_MODAL":
    return {
      ...state,
      filterModal:action.status
    }
 }
}