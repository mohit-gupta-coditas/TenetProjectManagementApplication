import type { OptionProps, SelectProps } from "./Select.types";
import styles from './Select.module.scss'

const Select=({children,...props}:SelectProps)=>{
 return (
  <div className={styles.shiftgroup}>
    <select className={styles.select} {...props}>{children}</select>
  </div>
 );
}

Select.Option = ({ children, ...props }: OptionProps) => {
  return <option {...props}>{children}</option>
}

export default Select