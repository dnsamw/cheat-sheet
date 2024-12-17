import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTags } from "../../services/firestoreService";

export const getTagsData = createAsyncThunk(
    "ui/getTags",
    async (_, { rejectWithValue }) => {
        try {
            const tags = await getAllTags();
            return tags;
        } catch (error: any) {
            console.error("Error fetching tags:", error);
            return rejectWithValue({
                message: "Failed to fetch tags",
                error: error.message,
            });
        }
});