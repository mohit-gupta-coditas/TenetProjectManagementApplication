import styles from './Header.module.scss'
import companyLogo from '../../assets/letter-t.png'
import { useNavigate } from 'react-router-dom';
import Button from '../GenericComponents/Button/Button';
import { useGetUserQuery } from '../../services/authapi';

const Header=()=>{
  const {data}=useGetUserQuery()
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/signin");
  }
  return(
    <header className={styles.header}>
      <div className={styles.logoDiv}>
        <img src={companyLogo} alt="" />
        <div>
          <h1>TENET</h1>
        </div>
      </div>
      <div className={styles.userDiv}>
        <h3>{data?.data.email}</h3>
        <Button onClick={handleLogout} variant='Secondary'>LOGOUT</Button>
      </div>
    </header>
  );
}

export default Header