import { useForm } from "react-hook-form";
import type { CompanyFormType, CreateCompanyProps } from "./CreateCompanyForm.types";
import styles from './CreateCompanyForm.module.scss'
import Input from "../../GenericComponents/Input/Input";
import Select from "../../GenericComponents/Select/Select";
import Button from "../../GenericComponents/Button/Button";
import { useCreateCompanyMutation } from "../../../services/superAdminCards";
import Message from "../../Message/Message";

const CreateCompanyForm=({dispatch}:CreateCompanyProps)=>{
  const [CreateCompany]=useCreateCompanyMutation()

  const {register,handleSubmit,formState:{errors}}=useForm<CompanyFormType>();

  const onSubmit=async(data:any)=>
  {
    console.log(data)
    await CreateCompany(data)
    dispatch({ type: "COMPANY_MODAL", status: false })
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      <Input label="Company Name" {...register("companyName")} placeholder="Company Name"/>
      {errors.companyName && <Message type="error" message="invalid"/>}

      <Input type="file" {...register("companyLogo")}/>
      {errors.companyLogo && <Message type="error" message="invalid"/>}

      <Input label="Admin Email" {...register("adminMail")} placeholder="Admin Email"/>
      {errors.adminMail && <Message type="error" message="please enter an email"/>}

      <Select {...register("subscription")}>

        <Select.Option value="basic">BASIC</Select.Option>
        <Select.Option value="half">HALF</Select.Option>
        <Select.Option value="full">FULL</Select.Option>

      </Select>
      {errors.subscription && <Message type="error" message="please choose an option"/>}
      
      <div className={styles.btnDiv}>
          <Button type="submit">CREATE</Button>
      </div>

    </form>
  );
}

export default CreateCompanyForm