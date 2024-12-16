import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserbyUUID, login } from "../../services/firestoreService";


export const getUserCredentials = createAsyncThunk(
  "auth/getUserCredentials",
  async (data: any, { dispatch, getState, rejectWithValue }) => {
    try {
      const userCredential = await login(data.email, data.password);
      const userData = await getUserbyUUID(userCredential.user.uid);      
      return {...userData, email: userCredential.user.email, uid: userCredential.user.uid};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);