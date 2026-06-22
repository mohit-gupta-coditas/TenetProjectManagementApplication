import { baseApi } from "./baseapi";

export const authapi=baseApi.injectEndpoints({
  endpoints:(builder)=>({

    sendOtp: builder.mutation<{data:any,error:any}, { email: string }>({
      query: (body) => ({
        url: 'auth/sendotp',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: builder.mutation<{data:any,error:any}, { email: string; otp: string }>({
      query: (body) => ({
        url: 'auth/verifyotp',
        method: 'POST',
        body,
      }),
    }),

    setPassword: builder.mutation<{ success: boolean }, { email: string; token: string; password: string }>({
      query: (body) => ({
        url: 'set-password',
        method: 'POST',
        body,
      }),
    }),

    getUser: builder.query<{data:any,error:any},void>({
      query:()=>({
        url:"auth/tokenDetails",
        method: 'GET',
      })
    })
  })
})

export const { useGetUserQuery,useSendOtpMutation, useSetPasswordMutation, useVerifyOtpMutation}=authapi
