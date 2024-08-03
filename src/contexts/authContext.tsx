// src/context/AuthContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from 'firebase/auth';

type AuthState = {
  user: User | null;
  role: string | null;
};

type AuthAction =
  | { type: 'LOGIN'; payload: { user: User; role: string } }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  role: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.user,
        role: action.payload.role,
      };
    case 'LOGOUT':
      return {
        user: null,
        role: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);