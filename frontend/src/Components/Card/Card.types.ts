import type { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren{
  id:number;
  onClick:(id:number)=>void
}