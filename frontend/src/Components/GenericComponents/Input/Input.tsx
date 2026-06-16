import type { InputProps } from "./Input.types"
import styles from './Input.module.scss'

const Input=({label,...props}:InputProps)=>{
  return(
    <div className={styles.shiftgroup}>
      <input id={label} className={styles.shiftinput} {...props} ></input>
      <label htmlFor={label} className={styles.shiftlabel}>{label}</label>
    </div>
  );
}

export default Input