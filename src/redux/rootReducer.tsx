import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import encryptTransform from "redux-persist-transform-encrypt";

import { Config } from "../Config";

export interface RootState {
  auth: any;
  items: any;
}

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "role", "loading", "authError"],
  transform: [
    encryptTransform({
      secretKey: Config.reduxPersistEncryptKey,
    }),
  ],
};

const rootReducer = combineReducers({
    // auth,
    // items
})

export default rootReducer;
