import { baseApi } from "./baseapi";

export const superAdminCard=baseApi.injectEndpoints({
  endpoints:(builder)=>({
    loadCards: builder.query<{data:any,error:any},void>({
      query:()=>({
        url:"/loadSuperAdmin",
        method:"GET",
      }),
      providesTags:["CompanyCards"]
    }),
    sortCompany: builder.mutation<void,{data:string,sort:string}>({
      query:(body)=>({
        url:"/sortCompany",
        method:"POST",
        body
      }),
      invalidatesTags:["CompanyCards"]
    }),
    searchCompany: builder.mutation<void,{search:string}>({
      query:(body)=>({
        url:"/searchCompany",
        method:"POST",
        body
      }),
      invalidatesTags:["CompanyCards"]
    }),
    filterCompany: builder.mutation<void,{filter:string}>({
      query:(body)=>({
        url:"/filterCompany",
        method:"POST",
        body
      }),
      invalidatesTags:["CompanyCards"]
    }),
    CreateCompany: builder.mutation<void,{id:number}>({
      query:(body)=>({
        url:"/createCompany",
        method:"POST",
        body,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }),
      invalidatesTags:["CompanyCards"]
    }),


  })
})

export const {useLoadCardsQuery,useCreateCompanyMutation,useFilterCompanyMutation,useSearchCompanyMutation,useSortCompanyMutation}=superAdminCard