import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import authReducer, { AuthSlice } from "./auth/authSlice";
import itemsReducer, { ItemsSlice } from "./items/itemsSlice";
import uiReducer,{ UiSlice } from "./ui/uiSlice";

export interface RootState {
  auth: AuthSlice;
  items: ItemsSlice;
  ui: UiSlice;
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

const uiConfig = {
  key: "ui",
  storage,
  whitelist: ["tags, selectedTags"],
}

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  items: persistReducer(itemsConfig, itemsReducer),
  ui: persistReducer(uiConfig, uiReducer),
});

export default rootReducer;
