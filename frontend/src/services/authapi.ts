import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fjs484xv-3000.inc1.devtunnels.ms/' }),
  endpoints: (builder) => ({

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
        url: '/set-password',
        method: 'POST',
        body,
      }),
    }),

  }),
});

export const { 
  useSendOtpMutation, 
  useVerifyOtpMutation, 
  useSetPasswordMutation 
} = authApi;



