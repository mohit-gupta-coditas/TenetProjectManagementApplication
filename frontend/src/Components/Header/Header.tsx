import styles from './Header.module.scss'
import useAuth from '../../context/authContext';
import companyLogo from '../../assets/letter-t.png'
import { useNavigate } from 'react-router-dom';
import Button from '../GenericComponents/Button/Button';

const Header=()=>{
  const {user,logout}=useAuth();
  const navigate = useNavigate();
  const handleLogout=()=>{
    logout()
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
        <h3>{user?.email}</h3>
        <Button onClick={handleLogout} variant='Secondary'>LOGOUT</Button>
      </div>
    </header>
  );
}

export default Header