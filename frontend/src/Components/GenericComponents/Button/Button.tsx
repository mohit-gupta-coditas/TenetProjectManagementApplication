import clsx from 'clsx';
import styles from './Button.module.scss'
import type { ButtonProps } from './Button.types';

const Button=({className,children,...props}:ButtonProps)=>{
  return(
    <button {...props} className={clsx(styles.button,className)}>{children}</button>
  );
}
export const PrimaryButton = (props: ButtonProps) => {
    return <Button {...props} className={styles.PrimaryButton}></Button>
}

export const SecondaryButton = (props: ButtonProps) => {
    return <Button {...props} className={styles.SecondaryButton}></Button>
}

export const TertiaryButton = (props: ButtonProps) => {
    return <Button {...props} className={styles.TertiaryButton}></Button>
}

export default Button