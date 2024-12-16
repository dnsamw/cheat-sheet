import { useContext, useEffect } from "react";
import { ItemContext } from "../contexts/itemContext";
import { getAllNotes } from "../services/firestoreService";
import { ItemActionKind } from "../types/item";
import { ITEMS_CACHE_KEY } from "../reducers/intemReducer";
import { isCacheValid } from "../utils";
import { useAppDispatch } from "../redux/store";
import { getItemsData } from "../redux/items/itemsActions";

export const useNotesFetch = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("App must be used within an ItemProvider");
  }
  const { state, dispatch } = context;
  const dispatchX = useAppDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // integration test
        dispatchX(getItemsData()).unwrap();

        const cachedData = localStorage.getItem(ITEMS_CACHE_KEY);
        if (cachedData) {
          console.log("has cache");

          const parsedData = JSON.parse(cachedData);
          console.log("parsedData", parsedData);

          if (isCacheValid(parsedData.lastFetched)) {
            dispatch({
              type: ItemActionKind.FETCH_ITEMS_SUCCESS,
              payload: parsedData.items,
            });
            return;
          }
        } else {
          console.log("no cache");

          dispatch({ type: ItemActionKind.FETCH_ITEMS_REQUEST });
          const items = await getAllNotes();
          dispatch({
            type: ItemActionKind.FETCH_ITEMS_SUCCESS,
            payload: items,
          });
        }
        dispatch({ type: ItemActionKind.FETCH_ITEMS_REQUEST });
        const items = await getAllNotes();
        dispatch({
          type: ItemActionKind.FETCH_ITEMS_SUCCESS,
          payload: items,
        });
      } catch (error) {
        console.log("Context", { error });

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
