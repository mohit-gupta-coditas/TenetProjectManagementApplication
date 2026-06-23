import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi=createApi({
  reducerPath:"api",
  baseQuery:fetchBaseQuery({
    baseUrl:'https://fjs484xv-3000.inc1.devtunnels.ms/',
    prepareHeaders:(headers)=>{
      const token=localStorage.getItem("token");
      if(token){
        headers.set("Authorization",`Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes:["CompanyCards"],
  endpoints:()=>({})
})