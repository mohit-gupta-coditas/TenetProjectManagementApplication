import type { ModalProps } from "./Modal.types"
import styles from './Modal.module.scss'
import Button from "../Button/Button";
const Modal=({title,onClick,children}:ModalProps)=>{
  return(
    <div className={styles.modal}>
      <div className={styles.formContainer}>
          <h2>{title}</h2>
          {children}
          <Button variant="Secondary" className={styles.floating} onClick={onClick}>X</Button>
      </div>
    </div>
  );
}
export default Modal