import type { TextAreaProps } from "./TextArea.types";
import styles from './TextArea.module.scss'

const TextArea=({label,id,...props}:TextAreaProps)=>{
  return( 
    <div className={styles.shiftgroup}>
      <textarea className={styles.shiftinput} {...props} ></textarea>
      <label className={styles.shiftlabel}>{label}</label>
    </div>
  );
}

export default TextArea