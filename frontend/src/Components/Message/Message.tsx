import styles from "./Message.module.scss"; 
import type { MessageProps } from "./Message.types";

export default function Message({type, message}:MessageProps) {
  if (!message) return null;
  const messageClass = type === 'success' ? styles.SuccessMessage : styles.ErrorMessage;
  return (
    <p className={messageClass}>
      {message}
    </p>
  );
}
