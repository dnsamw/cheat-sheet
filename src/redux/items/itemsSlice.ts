import { createSlice } from "@reduxjs/toolkit";
import { getItemsData } from "./itemsActions";
import { clear } from "console";

export interface ItemsSlice {
  loading: boolean;
  items: any;
  itemsError: string;
}

const initialState: ItemsSlice = {
  loading: false,
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
    setItemsError: (state, action) => {
      state.itemsError = action.payload;
    },
    clearItems: () => initialState,

  },
  extraReducers: (builder) => {
    builder.addCase(getItemsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getItemsData.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getItemsData.rejected, (state, action) => {
      state.loading = false;
      state.itemsError = action.payload as string;
    });
  },
});

export const { setLoading,setItemsError,clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
