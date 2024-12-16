import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import authReducer, { AuthSlice } from "./auth/authSlice";
import itemsReducer, { ItemsSlice } from "./items/itemsSlice";

export interface RootState {
  auth: AuthSlice;
  items: ItemsSlice;
}

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["authUser"],
};

const itemsConfig = {
  key: "items",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  items: persistReducer(itemsConfig, itemsReducer),
});

export default rootReducer;
