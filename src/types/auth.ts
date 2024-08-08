import { User } from "firebase/auth";

export enum AuthActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_LOADING = "SET_LOADING",
  SET_AUTH_ERROR = "SET_AUTH_ERROR",
}

// ts-type for action, action is just and object with 2 properties: type and payload 
export type AuthState = {
  user: User | null;
  role: string | null;
  loading: boolean;
  authError: string|null;
};

export type AuthAction =
  | { type: AuthActionKind.LOGIN; payload: { user: User; role: string } }
  | { type: AuthActionKind.LOGOUT }
  | { type: AuthActionKind.SET_LOADING; payload: boolean }
  | { type: AuthActionKind.SET_AUTH_ERROR; payload: string };
