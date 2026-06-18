import type { RadioProps } from "./Radio.types";
import styles from './Radio.module.scss'
const Radio=({label,id,...props}:RadioProps)=>{
  return(
    <div className={styles.radio}>
      <label htmlFor={id}>{label}</label>
      <input type="radio" id={id} {...props}/>
    </div>
  );
}
export default Radio