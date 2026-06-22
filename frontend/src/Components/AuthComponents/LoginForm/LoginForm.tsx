import { useEffect, useReducer } from "react";
import styles from './LoginForm.module.scss';
import { useNavigate } from "react-router-dom";
import { initialState, loginReducer } from "../../../reducer/loginReducer";
import { useGetUserQuery, useSendOtpMutation, useVerifyOtpMutation } from "../../../services/authapi";
import Button from "../../GenericComponents/Button/Button";
import EmailForm from "../EmailForm/EmailForm";
import VerifyOTPForm from "../VerifyOTPForm/VerifyOTPForm";
import Message from "../../Message/Message";

const LoginForm = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const navigate=useNavigate()

  const [sendOTP, sendOTPState] = useSendOtpMutation();
  const [verifyOTP, sendVerifyOTP] = useVerifyOtpMutation()

  useEffect(() => {
    if (state.step !== 'OTP' || state.secondsLeft <= 0) return;
    const timer = setInterval(() => {
      dispatch({type:"TIMER_CHANGE",seconds:state.secondsLeft-1})
    }, 1000);
    return () => clearInterval(timer);
  }, [state.step, state.secondsLeft]);

  const handleEmailSubmit = async (data: { email: string }) => {
    dispatch({ type: 'START_SENDING_OTP' });
    try {
      await sendOTP({ email: data.email }) 
      dispatch({type:"TIMER_CHANGE",seconds:30})
      dispatch({ type: 'SET_OTP_STEP', payload: data.email });
    }
    catch(error) {
      console.error("failed with error: ", error)
    }
  };
  const handleResendOTP = async () => {
    dispatch({ type: 'START_SENDING_OTP' });
    try {
      await sendOTP({ email: state.email })
      dispatch({type:"TIMER_CHANGE",seconds:30})
      dispatch({ type: 'SET_OTP_STEP', payload: state.email });
    }
    catch (error) {
      console.error("failed", error)
    }
  }
  const handleLoginSubmit = async (data: { otp: string }) => {
    dispatch({ type: "LOGIN_STATUS", status: true })
    try {
      const response = await verifyOTP({ email: state.email, otp: data.otp })
      const dataObj=response.data
      console.log(dataObj)
      if(!dataObj) {
        return dispatch({ type: "LOGIN_STATUS", status: false }) 
      } 
      const token = dataObj.data.accessToken
      console.log(token)
      localStorage.setItem("token",token)
      
    }
    catch(error) {
      console.error(error)
      dispatch({ type: "LOGIN_STATUS", status: false })
    }
  };

  if (state.step === 'EMAIL') {
    return (
      <EmailForm isLoading={state.isLoading} onSubmit={handleEmailSubmit}></EmailForm>
    );
  }

  return (
    <VerifyOTPForm onLogin={handleLoginSubmit} isLoading={state.isLoading}>
      <div className={styles.extras}>
        {sendVerifyOTP.isError ? (
          <Message type="error" message="OTP is invalid/wrong"/>
        ) : (
          sendOTPState.isSuccess && <Message type="success" message="OTP sent successfully"/>
        )}
      </div>
      <p className={styles.current}>
        If an account exists for <strong> {state.email} </strong>, an OTP has been sent.
      </p>
      <div className={styles.actionLinks}>
        {state.secondsLeft > 0 ? (
          <Button type="button" disabled>
            Resend OTP in {state.secondsLeft}s
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleResendOTP}
            disabled={state.isLoading}
          >
            Resend OTP
          </Button>
        )}
        <Button
          type="button"
          onClick={() => {
            dispatch({ type: 'GO_BACK_TO_EMAIL' });
          }}
          variant="Tertiary"
        >
          Change Email
        </Button>
      </div>
    </VerifyOTPForm>
  );
};

export default LoginForm

