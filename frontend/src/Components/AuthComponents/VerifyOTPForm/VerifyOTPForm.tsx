import styles from './VerifyOTPForm.module.scss'
import { useForm } from "react-hook-form";
import Input from "../../GenericComponents/Input/Input";
import Button from "../../GenericComponents/Button/Button";
import type { VerifyOTPFormType, VerifyOTPProps } from './VerifyOTPForm.types';
import Message from '../../Message/Message';

const VerifyOTPForm=({children,onLogin,isLoading}:VerifyOTPProps)=>{
  const {register,handleSubmit,formState:{errors}}=useForm<VerifyOTPFormType>()

  return(
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
      {children}
      <Input label="OTP" placeholder="OTP "{...register("otp",{required:"OTP cannot be empty",
         maxLength:{
        value:4,
        message:"Maximum 4 characters allowed"
      },
      minLength:{
        value:4,
        message:"Minimum 4 characters needed"
      }
      })}/>
      {errors.otp && <Message type='error' message={errors.otp?.message}/>}
      <div>
         <Button type="submit" disabled={isLoading}>
          {isLoading ? "LOADING.." : "LOGIN"}
         </Button>
      </div>
    </form>
    </div>
    
  );
}
export default VerifyOTPForm