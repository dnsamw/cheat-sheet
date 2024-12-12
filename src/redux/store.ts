import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import encryptTransform from "redux-persist-transform-encrypt";
import rootReducer from "./rootReducer";
import { Config } from "../Config";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth", "items"],
  transform: [
    encryptTransform({
      secretKey: Config.reduxPersistEncryptKey,
    }),
  ],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store)

export {rootReducer, store, persistor}

export type Store = typeof store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;