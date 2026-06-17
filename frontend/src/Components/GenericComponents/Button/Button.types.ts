import type { ButtonHTMLAttributes } from "react";

type Variant="Primary"|"Secondary"|"Tertiary"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant?:Variant
}