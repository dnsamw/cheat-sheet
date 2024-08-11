import { useContext, useEffect } from "react";
import { ItemContext } from "../contexts/itemContext";
import { getAllItems } from "../services/firestoreService";
import { ItemActionKind } from "../types/item";

export const useNotesFetch = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("App must be used within an ItemProvider");
  }
  const { state, dispatch } = context;

  useEffect(() => {
     
      const fetchNotes = async () => {
        try {
          dispatch({ type: ItemActionKind.FETCH_ITEMS_REQUEST });
          const items = await getAllItems();
          dispatch({
            type: ItemActionKind.FETCH_ITEMS_SUCCESS,
            payload: items,
          });
        } catch (error) {
          dispatch({
            type: ItemActionKind.FETCH_ITEMS_FAILURE,
            payload:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          });
        }
      };
      
      fetchNotes();
  }, []);

  return {
    items: state.items,
    error: state.error,
    loading: state.loading,
  };
};
