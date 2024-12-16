import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllItems } from "../../services/firestoreService";

export const getItemsData = createAsyncThunk(
  "auth/getItemsData",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const itemsData = await getAllItems();

      // Serialize createdAt and updatedAt
      const serializedItems = itemsData.map((item) => ({
        ...item,
        createdAt: item.createdAt
          ? item.createdAt.seconds * 1000 // Convert to milliseconds
          : null,
        updatedAt: item.updatedAt ? item.updatedAt.seconds * 1000 : null,
        type: item.type || "note",
      }));

      console.log("itemsData", serializedItems);
      return serializedItems;
      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
