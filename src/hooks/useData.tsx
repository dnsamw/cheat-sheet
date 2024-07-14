import { useContext, useEffect } from "react";
import { ItemContext } from "../contexts/itemContext";
import { ItemActionKind } from "../types/item";
import { getAllItems } from "../services/firestoreService";


export const useData = ()=>{
    const context = useContext(ItemContext);
  if (!context) {
    throw new Error("App must be used within an ItemProvider");
  }
  const { state, dispatch } = context;

  useEffect(() => {
    // const controller = new AbortController();
    const fetchItems = async () => {
      try {
        dispatch({ type: ItemActionKind.FETCH_ITEMS_REQUEST });
        const items = await getAllItems();
        dispatch({ 
          type: ItemActionKind.FETCH_ITEMS_SUCCESS, 
          payload: items 
        });
      } catch (error) {
        dispatch({ 
          type: ItemActionKind.FETCH_ITEMS_FAILURE, 
          payload: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      }
    };
    fetchItems();
    // return ()=>controller.abort()
  }, []);

  return {
    items:state.items,
    error:state.error,
    loading:state.loading,
}
}