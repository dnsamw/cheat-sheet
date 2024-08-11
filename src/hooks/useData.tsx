import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ItemContext } from "../contexts/itemContext";
import { I_CheatItem, ItemActionKind } from "../types/item";
import { createItem, deleteItem, getAllItems,getItemById, updateItem } from "../services/firestoreService";

export const useData = () => {
  const context = useContext(ItemContext);
  const dataFetchedRef = useRef(false);

  if (!context) {
    throw new Error("App must be used within an ItemProvider");
  }
  const { state, dispatch } = context;

  useEffect(() => {
      console.log("DATA FETCHING..");
      
      const fetchItems = async () => {
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
      
      fetchItems();
  }, [dispatch]);

  const getCheatItemById = useCallback(async (id: string) => {
    try {
      dispatch({ type: ItemActionKind.FETCH_ITEM_REQUEST });
      const item = await getItemById(id);
      if (item) {
        dispatch({
          type: ItemActionKind.FETCH_ITEM_SUCCESS,
          payload: item,
        });
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      dispatch({
        type: ItemActionKind.FETCH_ITEM_FAILURE,
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
      });
    }
  }, [dispatch]);

  const createCheatItem = useCallback(async (item: Omit<I_CheatItem, 'id'>) => {
    try {
      dispatch({ type: ItemActionKind.CREATE_ITEM_REQUEST });
      
      const id = await createItem(item);
      dispatch({
        type: ItemActionKind.CREATE_ITEM_SUCCESS,
        payload: { id, ...item },
        
      });
    } catch (error) {
      dispatch({
        type: ItemActionKind.CREATE_ITEM_FAILURE,
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
      });
    }
  }, [dispatch]);

  const updateCheatItem = useCallback(async (item:I_CheatItem) => {
    try {
      dispatch({ type: ItemActionKind.UPDATE_ITEM_REQUEST });
      await updateItem(item.id, item);
      dispatch({
        type: ItemActionKind.UPDATE_ITEM_SUCCESS,
        payload: item,
      });
    } catch (error) {
      dispatch({
        type: ItemActionKind.UPDATE_ITEM_FAILURE,
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
      });
    }
  }, [dispatch]);

  const deleteCheatItem = useCallback(async (itemId: string) => {
    try {
      dispatch({ type: ItemActionKind.DELETE_ITEM_REQUEST });
      await deleteItem(itemId);
      dispatch({
        type: ItemActionKind.DELETE_ITEM_SUCCESS,
        payload: itemId,
      });
    } catch (error) {
      dispatch({
        type: ItemActionKind.DELETE_ITEM_FAILURE,
        payload:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
      });
    }
  }, [dispatch]);

  return {
    items: state.items,
    error: state.error,
    loading: state.loading,
    getCheatItemById,
    createCheatItem,
    updateCheatItem,
    deleteCheatItem,
  };
};
