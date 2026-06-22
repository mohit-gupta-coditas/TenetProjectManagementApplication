import type { LabelProps } from "./Label.types";

const Label=({className,children,...props}:LabelProps)=>{
  return(
    <label {...props} className={className}>{children}</label>
  );
}

export default Label