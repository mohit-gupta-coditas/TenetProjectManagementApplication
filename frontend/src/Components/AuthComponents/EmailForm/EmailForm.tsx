import styles from "./EmailForm.module.scss"
import { useForm } from "react-hook-form";
import Input from "../../GenericComponents/Input/Input";
import Button from "../../GenericComponents/Button/Button";
import type { EmailFormProps } from "./EmailForm.types";
import Message from "../../Message/Message";


const EmailForm=({onSubmit,isLoading}:EmailFormProps)=>{
  const {register,handleSubmit,formState:{errors}} =useForm<{email:string}>()
  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" placeholder="Email" {...register("email",{
                  required: "Email field can't be empty",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address format"
                  }
                })}></Input>
      {errors.email && <Message type="error" message={errors.email.message}/>}
      <div className={styles.btnDiv}>
        <Button type="submit" disabled={isLoading}> 
                  {isLoading ? "LOADING..." : "SEND OTP"}
        </Button>
      </div>
    </form>
  );
}

export default EmailForm