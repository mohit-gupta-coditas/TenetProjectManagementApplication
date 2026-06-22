import type { RadioProps } from "./Radio.types";
import styles from './Radio.module.scss'
import Label from "../Label/Label";
const Radio=({label,id,...props}:RadioProps)=>{
  return(
    <div className={styles.radio}>
      <Label htmlFor={id}>{label}</Label>
      <input type="radio" id={id} {...props}/>
    </div>
  );
}
export default Radio