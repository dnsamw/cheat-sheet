// src/context/AuthContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';
import AuthReducer, { initialState } from '../reducers/authReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { AuthAction, AuthActionKind, AuthState } from '../types/auth';


const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>; // dispatch is a function that takes a generic type as the type argument, we should pass our Action ts-type as the type argument. 
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        dispatch({ type: AuthActionKind.LOGIN, payload: { user, role: userData?.role || 'user' } });

      } else {
        dispatch({ type: AuthActionKind.LOGOUT });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);