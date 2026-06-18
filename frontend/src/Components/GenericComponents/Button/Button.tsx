import clsx from "clsx";
import styles from "./Button.module.scss"
import type { ButtonProps } from "./Button.types.ts"

const Button = ({ children,className,variant, ...props}: ButtonProps) => {
    return (
        <button {...props} className={clsx(styles.button,className,variant && styles[variant])}>
            {children}
        </button>
    );
};


export default Button;