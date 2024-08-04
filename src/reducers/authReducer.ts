import { User } from "firebase/auth";

export type AuthState = {
  user: User | null;
  role: string | null;
  loading: boolean
};

// ts-type for action, action is just and object with 2 properties: type and payload 
export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; role: string } }
  | { type: "LOGOUT" }
  | { type: 'SET_LOADING'; payload: boolean };

export const initialState: AuthState = {
  user: null,
  role: null,
  loading: true
};

// Reducer function, is a pure function that takes state and action, returns new state depending on action
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        role: action.payload.role,
        loading: false
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        loading: false
      };
    case 'SET_LOADING':
    return {
        ...state,
        loading: action.payload,
    };
    default:
      return state;
  }
};


export default AuthReducer;