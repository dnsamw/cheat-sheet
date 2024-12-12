import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserbyUUID, login } from "../../services/firestoreService";
import { setAuthuser } from "./authSlice";


export const getUserCredentials = createAsyncThunk(
  "auth/getUserCredentials",
  async (data: any, { dispatch, getState, rejectWithValue }) => {
    try {
      const userCredential = await login(data.email, data.password);
      const userData = await getUserbyUUID(userCredential.user.uid);
      console.log("userData", userData);
      
    //   dispatch(setAuthuser(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
