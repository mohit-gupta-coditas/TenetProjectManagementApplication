import { useForm } from "react-hook-form";
import styles from './SortCompanyForm.module.scss'
import { useState } from "react";
import type { SortCompanyFormType, SortCompanyProps } from "./SortCompanyForm.types";
import Button from "../../GenericComponents/Button/Button";
import Radio from "../../GenericComponents/Radio/Radio";
import Message from "../../Message/Message";
import { useSortCompanyMutation } from "../../../services/superAdminCards";

const SortCompanyForm=({dispatch}:SortCompanyProps)=>{
  const [sort,setSort]=useState("")
  const [sortCompany]=useSortCompanyMutation()

  const {register,handleSubmit,formState:{errors},getValues}=useForm<SortCompanyFormType>()

  const handleSortClick=async()=>
  {
    const data=getValues("sort")
    await sortCompany({data,sort})
    dispatch({ type: "SORT_MODAL", status: false })
  }

  return(
    <form onSubmit={handleSubmit(handleSortClick)} className={styles.form}>

      <Radio value="company name" id="Company name" label="Company Name" {...register("sort")}/>

      <Radio value="email" id="Email" label="Email" {...register("sort")}/>

      <Radio value="subscirption" id="Subscription" label="Subscription" {...register("sort")}/>

      {errors.sort && <Message type="error" message="Choose one value"/>}

      <div className={styles.btns}>

        <Button type="submit" onClick={()=>setSort("ASC")}>ASC</Button>
        <Button type="submit" onClick={()=>setSort("DESC")}>DESC</Button>

      </div>

    </form>
  );
}

export default SortCompanyForm