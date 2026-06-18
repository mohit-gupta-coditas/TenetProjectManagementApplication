import type { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  defaultValue?:string;
}

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement>{}