import { useEffect, useReducer, useState } from "react";
import styles from './LoginForm.module.scss';
import useAuth from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { initialState, loginReducer } from "../../../reducer/loginReducer";
import { useSendOtpMutation, useVerifyOtpMutation } from "../../../services/authapi";
import Button from "../../GenericComponents/Button/Button";
import EmailForm from "../EmailForm/EmailForm";
import VerifyOTPForm from "../VerifyOTPForm/VerifyOTPForm";

const LoginForm = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { login } = useAuth()
  const navigate=useNavigate()

  const [secondsLeft, setSecondsLeft] = useState(30);

  const [sendOTP, sendOTPState] = useSendOtpMutation();
  const [verifyOTP, sendVerifyOTP] = useVerifyOtpMutation()

  useEffect(() => {
    if (state.step !== 'OTP' || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [state.step, secondsLeft]);

  const handleEmailSubmit = async (data: { email: string }) => {
    dispatch({ type: 'START_SENDING_OTP' });
    try {
      await sendOTP({ email: data.email }) 
      setSecondsLeft(30);
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
      setSecondsLeft(30);
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
      if(!dataObj) {
        return dispatch({ type: "LOGIN_STATUS", status: false }) 
      } 
      login(dataObj.data)
      navigate(`/${dataObj.data.globalRole}`)
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
          <p className={styles.ErrorMessage}>OTP is invalid/wrong</p>
        ) : (
          sendOTPState.isSuccess && <p className={styles.SuccessMessage}>OTP sent successfully</p>
        )}
      </div>
      <p className={styles.current}>
        If an account exists for <strong> {state.email} </strong>, an OTP has been sent.
      </p>
      <div className={styles.actionLinks}>
        {secondsLeft > 0 ? (
          <Button type="button" disabled>
            Resend OTP in {secondsLeft}s
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

