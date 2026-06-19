import type { PropsWithChildren } from "react";

export interface EmailFormProps extends PropsWithChildren{
  onSubmit:(data:any)=>void
  isLoading:boolean;
}