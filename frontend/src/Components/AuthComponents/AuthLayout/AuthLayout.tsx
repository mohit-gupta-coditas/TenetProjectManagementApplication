import styles from './AuthLayout.module.scss'
import type { AuthLayoutProps } from './AuthLayout.types';
import companylogo from "../../../assets/letter-t.png"

const AuthLayout=({children}:AuthLayoutProps)=>{
  return(
    <div className={styles.container}>
      <div className={styles.colorContainer}>
        <div className={styles.formModal}>
          <div className={styles.heading}>
            <img src={companylogo} alt="" />
            <h1>TENET</h1>            
          </div>
          <p className={styles.p}>LOGIN TO CONTINUE</p>
          {children}
        </div>
      </div>
    </div>
  );
}
export default AuthLayout