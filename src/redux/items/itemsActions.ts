import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../services/firestoreService";
import { I_CheatItem } from "../../types/item";

// Read (Fetch)
export const getItemsData = createAsyncThunk(
  "items/getItemsData", // Changed slice name
  async (_, { rejectWithValue }) => {
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

      return serializedItems;
    } catch (error: any) {
      console.error("Error fetching items:", error); // Add error logging
      return rejectWithValue({
        message: "Failed to fetch items",
        error: error.message,
      });
    }
  }
);

// Create
export const createItemData = createAsyncThunk(
  "items/createItemData",
  async (itemData: Omit<I_CheatItem, "id">, { rejectWithValue }) => {
    try {
      const newItem = await createItem(itemData);
      return {
        ...newItem,
        createdAt: newItem.createdAt ? newItem.createdAt : null,
        updatedAt: newItem.updatedAt ? newItem.updatedAt : null,
      };
    } catch (error: any) {
      console.error("Error creating item:", error);
      return rejectWithValue({
        message: "Failed to create item",
        error: error.message,
      });
    }
  }
);

// Update
export const updateItemData = createAsyncThunk(
  "items/updateItemData",
  async (
    { id, updatedData }: { id: string; updatedData: Partial<I_CheatItem> },
    { rejectWithValue }
  ) => {
    try {
      const updatedItem = await updateItem(id, updatedData);
      return {
        ...updatedItem,
        createdAt: updatedItem.createdAt
          ? updatedItem.createdAt
          : null,
        updatedAt: updatedItem.updatedAt
          ? updatedItem.updatedAt
          : null,
      };
    } catch (error: any) {
      console.error("Error updating item:", error);
      return rejectWithValue({
        message: "Failed to update item",
        error: error.message,
      });
    }
  }
);

// Delete
export const deleteItemData = createAsyncThunk(
  "items/deleteItemData",
  async (itemId: string, { rejectWithValue }) => {
    try {
      await deleteItem(itemId);
      console.log("Deleted item with ID:", itemId);
      
      return itemId; // Return the ID of the deleted item
    } catch (error: any) {
      console.error("Error deleting item:", error);
      return rejectWithValue({
        message: "Failed to delete item",
        error: error.message,
      });
    }
  }
);
