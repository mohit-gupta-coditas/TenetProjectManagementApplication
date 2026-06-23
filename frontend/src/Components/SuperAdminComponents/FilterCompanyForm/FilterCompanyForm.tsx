import { useForm } from "react-hook-form";
import Button from "../../GenericComponents/Button/Button";
import Radio from "../../GenericComponents/Radio/Radio";
import type { FilterCompanyFormType, FilterCompanyProps } from "./FilterCompanyForm.types";
import Message from "../../Message/Message";
import { useFilterCompanyMutation } from "../../../services/superAdminCards";
import styles from './FilterCompanyForm.module.scss'

const FilterCompanyForm=({dispatch}:FilterCompanyProps)=>{
  const [filterCompany]=useFilterCompanyMutation();

  const {register,formState:{errors},handleSubmit,getValues}=useForm<FilterCompanyFormType>()

   const handleFilterClick=async()=>
  {
    const data=getValues("filter")
    await filterCompany({filter:data})
    dispatch({ type: "FILTER_MODAL", status: false })
  }
  return(
    <form onSubmit={handleSubmit(handleFilterClick)} className={styles.form}>

        <Radio label="HALF" value="half" {...register("filter")}/>
        <Radio label="FULL" value="full" {...register("filter")}/>
        <Radio label="BASIC" value="basic" {...register("filter")}></Radio>

        {errors.filter && <Message type="error" message="Choose one value"/>}
        <div className={styles.btns}>
          <Button>FILTER</Button>
        </div>

    </form>
  )
}

export default FilterCompanyForm