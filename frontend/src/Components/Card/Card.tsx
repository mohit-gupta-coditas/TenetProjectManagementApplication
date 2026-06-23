import type { CardProps } from "./Card.types"
import styles from './Card.module.scss'

const Card=({id,onClick,children}:CardProps)=>{
  return(
    <div className={styles.Card} onClick={()=>onClick(id)}>
      {children}
    </div>
  );
}

export default Card