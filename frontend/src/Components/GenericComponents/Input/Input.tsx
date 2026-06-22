import type { InputProps } from "./Input.types"
import styles from './Input.module.scss'
import Label from "../Label/Label";

const Input=({label,...props}:InputProps)=>{
  return(
    <div className={styles.shiftgroup}>
      <input id={label} className={styles.shiftinput} {...props} ></input>
      <Label htmlFor={label} className={styles.shiftlabel}>{label}</Label>
    </div>
  );
}

export default Input