import styles from './Button.module.scss'
import type { ButtonProps } from './Button.types';

const Button=({className,children,onClick,...props}:ButtonProps)=>{
  return(
    <button {...props} onClick={onClick} className={[styles.button,className].join(" ")}>{children}</button>
  );
}

export default Button