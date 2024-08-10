import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { ModalAction, ModalState } from "../types/modal";
import ModalReducer, { initialState } from "../reducers/modalReducer";

interface ModalContextType {
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}

const ModalContext = createContext<ModalContextType>({
  state: initialState,
  dispatch: () => null,
});

export const ModalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};


export const useModal = () => useContext(ModalContext);