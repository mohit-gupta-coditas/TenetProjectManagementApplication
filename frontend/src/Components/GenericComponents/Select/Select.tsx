import type { SelectProps } from "./Select.types";
import styles from './Select.module.scss'

const Select=({options=[],defaultValue="select an option",...props}:SelectProps)=>{
 return(
  <div className={styles.shiftgroup}>
    <select {...props} className={styles.select}>
    <option value="">{defaultValue}</option>
    {
    options.map((option)=>(
      <option key={option.value} value={option.value}>{option.label}</option>
    )
    )}
    </select>
  </div>
 );
}

export default Select