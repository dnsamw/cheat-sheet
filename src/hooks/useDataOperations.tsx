import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ItemContext } from "../contexts/itemContext";
import { I_CheatItem, ItemActionKind } from "../types/item";
import { createItem, deleteItem, getItemById, updateItem } from "../services/firestoreService";

export const useDataOperations = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("App must be used within an ItemProvider");
  }
  const { state, dispatch } = context;

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
