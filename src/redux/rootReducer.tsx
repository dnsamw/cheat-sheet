import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import auth from "./auth/authSlice";
import items from "./items/itemsSlice";

export interface RootState {
  auth: any;
  items: any;
}

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["authUser"],
};

const rootReducer = combineReducers({
    auth,
    items
})

export default rootReducer;
