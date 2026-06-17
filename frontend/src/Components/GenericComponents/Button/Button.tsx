import clsx from "clsx";
import styles from "./Button.module.scss"
import type { ButtonProps } from "./Button.types.ts"

const Button = ({ children, variant, ...props}: ButtonProps) => {
    return (
        <button {...props} className={clsx(styles.button,variant && styles[variant])}>
            {children}
        </button>
    );
};


export default Button;