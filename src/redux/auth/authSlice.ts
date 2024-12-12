import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
  loading: boolean;
  authUser: any;
  authError: string;
}

const initialState: AuthSlice = {
  loading: true,
  authUser: null,
  authError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authUser = action.payload;
    },
    logout: (state) => {
      state.authUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
