import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import ItemReducer, { initialState } from "../reducers/intemReducer";
import { I_ItemInitialState, ItemActionUnion } from "../types/item";

interface ItemContextType {
  state: I_ItemInitialState;
  dispatch: Dispatch<ItemActionUnion>;
}

export const ItemContext = createContext<ItemContextType>({
  state: initialState,
  dispatch: () => null,
});

export const ItemProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => useContext(ItemContext);