import { AuthAction, AuthActionKind, AuthState } from "../types/auth";

export const initialState: AuthState = {
  user: null,
  role: null,
  loading: true,
  authError: null,
};

// Reducer function, is a pure function that takes state and action, returns new state depending on action
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionKind.LOGIN:
      return {
        user: action.payload.user,
        role: action.payload.role,
        loading: false,
        authError: null,
      };
    case AuthActionKind.LOGOUT:
      return {
        user: null,
        role: null,
        loading: false,
        authError: null,
      };
    case AuthActionKind.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AuthActionKind.SET_AUTH_ERROR:
      return {
        user: null,
        role: null,
        loading: false,
        authError: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
