import type { PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren{
  title:string;
  onClick:()=>void
}