import type { TextAreaProps } from "./TextArea.types"
import styles from './TextArea.module.scss'
import Label from "../Label/Label";

const TextArea=({label,...props}:TextAreaProps)=>{
  return( 
    <div className={styles.shiftgroup}>
      <textarea className={styles.shiftinput} {...props} ></textarea>
      <Label className={styles.shiftlabel}>{label}</Label>
    </div>
  );
}

export default TextArea