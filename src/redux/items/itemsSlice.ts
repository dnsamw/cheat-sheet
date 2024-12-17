import { createSlice } from "@reduxjs/toolkit";
import { getItemsData, createItemData, updateItemData, deleteItemData } from "./itemsActions";
import { I_CheatItem } from "../../types/item";

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
    // Fetch items
    builder.addCase(getItemsData.pending, (state) => {
      state.loading = true;
    })
    .addCase(getItemsData.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(getItemsData.rejected, (state, action) => {
      state.loading = false;
      state.itemsError = action.payload as string;
    })

    // Create item
    .addCase(createItemData.pending, (state) => {
      state.loading = true;
    })
    .addCase(createItemData.fulfilled, (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    })
    .addCase(createItemData.rejected, (state, action) => {
      state.loading = false;
      state.itemsError = action.payload as string;
    })


    // Update item
    .addCase(updateItemData.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateItemData.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.items.findIndex((item:I_CheatItem) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    })
    .addCase(updateItemData.rejected, (state, action) => {
      state.loading = false;
      state.itemsError = action.payload as string;
    })

    // Delete item
    .addCase(deleteItemData.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteItemData.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item:I_CheatItem) => item.id !== action.payload);
    })
    .addCase(deleteItemData.rejected, (state, action) => {
      state.loading = false;
      state.itemsError = action.payload as string;
    })
  },
});

export const { setLoading,setItemsError,clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
