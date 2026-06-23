import { useReducer } from 'react';
import Card from '../../Components/Card/Card';
import styles from './SuperAdmin.module.scss'
import Button from '../../Components/GenericComponents/Button/Button';
import Modal from '../../Components/GenericComponents/Modal/Modal';
import CreateCompanyForm from '../../Components/SuperAdminComponents/CreateCompanyForm/CreateCompanyForm';
import SearchCompany from '../../Components/SuperAdminComponents/SearchCompany/SearchCompany';
import SortCompanyForm from '../../Components/SuperAdminComponents/SortCompanyForm/SortCompanyForm';
import { initialStateSA, superAdminReducer } from '../../reducer/superAdminReducer';
import { useLoadCardsQuery } from '../../services/superAdminCards';
import Loader from '../../Components/GenericComponents/Loader/Loader';
import Message from '../../Components/Message/Message';
import FilterCompanyForm from '../../Components/SuperAdminComponents/FilterCompanyForm/FilterCompanyForm';
import { useNavigate } from 'react-router-dom';

const SuperAdmin = () => {
  const [state, dispatch] = useReducer(superAdminReducer, initialStateSA)
  const { data: Cards, isError, isLoading } = useLoadCardsQuery();
  const navigate=useNavigate()

  const handleCompanyClick = async(id: number) => 
  {
    navigate(`/controlpanel/:${id}`)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.navbar}>
        <SearchCompany/>
        <div className={styles.utilityBtns}>
          <Button onClick={() => {
            dispatch({ type: "SORT_MODAL", status: true })
          }}>SORT</Button>
          <Button onClick={() => {
            dispatch({ type: "FILTER_MODAL", status: true })
          }}
          >FILTER</Button>
          <Button onClick={() => {
            dispatch({ type: "COMPANY_MODAL", status: true })
          }}
          >CREATE</Button>
        </div>
      </div>
      {isError ? <Message type='error' message='Error loading data' /> :
        <div className={styles.mainPage}>
          {
            isLoading ? <Loader /> :
              Cards?.data.cards.map((card: any) => {
                <Card id={card.id} onClick={() => handleCompanyClick(card.id)}>
                  <img src={card.url} className={styles.img} />
                  <h3>{card.title}</h3>
                  <div className={styles.subs}>
                    <h4>{card.subscription}</h4>
                  </div>
                </Card>
              })
          }
        </div>}

      {
        state.sortModal &&
        <Modal title='SORT' onClick={() => dispatch({ type: "SORT_MODAL", status: false })}>
          <SortCompanyForm dispatch={dispatch}/>
        </Modal>
      }

      {
        state.filterModal &&
        <Modal title='FILTER' onClick={() => dispatch({ type: "FILTER_MODAL", status: false })}>
          <FilterCompanyForm dispatch={dispatch}/>
        </Modal>
      }

      {
        state.companyModal &&
        <Modal title='CREATE COMPANY' onClick={() => dispatch({ type: "COMPANY_MODAL", status: false })}>
          <CreateCompanyForm dispatch={dispatch}/>
        </Modal>
      }
    </div>
  );
}

export default SuperAdmin