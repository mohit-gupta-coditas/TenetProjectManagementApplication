import { useForm } from 'react-hook-form';
import styles from './SearchCompany.module.scss'
import Input from '../../GenericComponents/Input/Input';
import Button from '../../GenericComponents/Button/Button';
import type { SearchType } from './SearchCompany.types';
import Message from '../../Message/Message';
import { useSearchCompanyMutation } from '../../../services/superAdminCards';


const SearchCompany=()=>{
  const {register,formState:{errors},handleSubmit,getValues}=useForm<SearchType>()
  const [searchCompany]=useSearchCompanyMutation()
  const handleSearchClick = async () => {
    const data=getValues("search")
    await searchCompany({search:data})
  }
  return(
      <form onSubmit={handleSubmit(handleSearchClick)} className={styles.searchDiv}>
          <Input placeholder="Search..." label="Search" type='search' {...register("search")}/>
          {errors.search && <Message type='error' message='failed search entry'/>}
          <Button type='submit'>SEARCH</Button>
      </form>
  );
}

export default SearchCompany