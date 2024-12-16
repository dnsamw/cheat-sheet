import { createSlice } from "@reduxjs/toolkit";
import { getUserCredentials } from "./authActions";

export interface AuthSlice {
  loading: boolean;
  authUser: any;
  authError: string;
}

const initialState: AuthSlice = {
  loading: false,
  authUser: null,
  authError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthuser: (state, action) => {
      state.authUser = action.payload;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCredentials.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserCredentials.fulfilled, (state, action) => {
      state.loading = false;
      state.authUser = action.payload;
    });
    builder.addCase(getUserCredentials.rejected, (state, action) => {
      state.loading = false;
      state.authError = action.payload as string;
    });
  },
});

export const { setAuthuser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
