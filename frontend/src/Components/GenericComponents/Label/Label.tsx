import type { LabelProps } from "./Label.types";

const Label=({children,...props}:LabelProps)=>{
  return(
    <label {...props}>{children}</label>
  );
}

export default Label