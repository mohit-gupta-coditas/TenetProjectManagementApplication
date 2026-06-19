export type LoginStep = 'EMAIL' | 'OTP';

export interface LoginState {
  step: LoginStep;
  email: string;
  isLoading: boolean;
}

export type LoginAction =
  | { type: 'START_SENDING_OTP' }
  | { type: 'SET_OTP_STEP'; payload: string }
  | { type: 'GO_BACK_TO_EMAIL' }
  | {type: "LOGIN_STATUS"; status:boolean}
  
export const initialState: LoginState = {
  step: 'EMAIL',
  email: '',
  isLoading: false,
};

export function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'START_SENDING_OTP':
      return { 
        ...state, 
        isLoading: true 
      };
    case 'SET_OTP_STEP':
      return { 
        ...state, 
        isLoading: false, 
        step: 'OTP', 
        email: action.payload 
      };
    case 'GO_BACK_TO_EMAIL':
      return { 
        ...state, 
        step: 'EMAIL' ,
        isLoading:false
      };
    case "LOGIN_STATUS":
      return {
        ...state,
        isLoading:action.status
      }
    default:
      return state;
  }
}
