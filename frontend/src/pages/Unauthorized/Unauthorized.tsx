import { useNavigate } from 'react-router-dom'
import Button from '../../Components/GenericComponents/Button/Button'
import styles from './Unauthorized.module.scss'
const Unauthorized=()=>{
  const navigate=useNavigate()
  return(
    <div className={styles.unauthorized}>
      <div>
        <h1>YOU HAVE TRIED ACCESSING AN UNAUTHORIZED PAGE...</h1>
        <Button variant='Tertiary' onClick={()=>navigate("/signin")}>Click here to LOG IN AGAIN</Button>
      </div>
    </div>
  )
}

export default Unauthorized