import { createSlice } from "@reduxjs/toolkit";
import { getTagsData } from "./uiActions";
import { clear } from "console";

export type Tag = {
    id: string;
    name: string;
    color: string;
}
export interface UiSlice {
  loading: boolean;
  uiError: string;
  isMobile: boolean;
  tags: Tag[];
  selectedTags: Tag[];
}

const initialState: UiSlice = {
  loading: false,
  uiError: "",
  isMobile: false,
  tags: [],
  selectedTags: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    clearTags: (state, action) => {
        state.tags = [];
    },
    setSelectedTags: (state, action) => {
        state.selectedTags = action.payload;
    },
    selectTag: (state, action) => {
      const index = state.selectedTags.indexOf(action.payload);
      if (index !== -1) {
        state.selectedTags[index] = action.payload;
      } else {
        state.selectedTags.push(action.payload);
      }
    },
    removeSelectedTag: (state, action) => {
      state.selectedTags = state.selectedTags.filter(
        (tag) => tag.name !== action.payload.name
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTagsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTagsData.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(getTagsData.rejected, (state, action) => {
        state.loading = false;
        state.uiError = action.payload as string;
      });
  },
});

export const { setIsMobile, selectTag, setSelectedTags, clearTags, removeSelectedTag } = uiSlice.actions;
export default uiSlice.reducer;
