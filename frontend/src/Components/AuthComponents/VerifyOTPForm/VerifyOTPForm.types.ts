import type { PropsWithChildren } from "react";

export interface VerifyOTPProps extends PropsWithChildren{
  onLogin:(data:{otp:string})=>void
  isLoading:boolean;
}

export interface VerifyOTPFormType{
  otp:string;
}