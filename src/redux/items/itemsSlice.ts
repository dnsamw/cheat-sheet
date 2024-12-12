import { createSlice } from "@reduxjs/toolkit";

interface ItemsSlice {
  loading: boolean;
  items: any;
  itemsError: string;
}

const initialState: ItemsSlice = {
  loading: true,
  items: [],
  itemsError: "",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading } = itemsSlice.actions;
export default itemsSlice.reducer;
