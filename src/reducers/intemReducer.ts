import { Timestamp } from "firebase/firestore";
import {
  I_ItemInitialState,
  ItemActionKind,
  ItemActionUnion,
} from "../types/item";

export const ITEMS_CACHE_KEY = 'items_cache';
export const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour

export const initialState: I_ItemInitialState = {
  items: [],
  loading: false,
  error: null,
};

const ItemReducer = (
  state: I_ItemInitialState = initialState, 
  action: ItemActionUnion
): I_ItemInitialState => {
  switch (action.type) {
    //Fetching Items
    case ItemActionKind.FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ItemActionKind.FETCH_ITEMS_SUCCESS:
      // create new state for caching
      const newState = {
        ...state,
        items: action.payload,
        loading: false,
        lastFetched: Date.now(),
      };

      // Cache the new state
      localStorage.setItem(ITEMS_CACHE_KEY, JSON.stringify(newState));
      return newState;

      // return {
      //   ...state,
      //   items: action.payload,
      //   loading: false,
      // };

    case ItemActionKind.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

      //Creating an Item
      case ItemActionKind.CREATE_ITEM_REQUEST:
        return { ...state, loading: true, error: null };
      case ItemActionKind.CREATE_ITEM_SUCCESS:
        
        const data1 = {
          ... action.payload,
          createdAt: Timestamp.now(),
        }

        return {
          ...state,
          loading: false,
          items: [...state.items,data1],
        };
      case ItemActionKind.CREATE_ITEM_FAILURE:
        return { ...state, loading: false, error: action.payload };

      //Updating an Item
      case ItemActionKind.UPDATE_ITEM_REQUEST:
        return { ...state, loading: true, error: null };
      case ItemActionKind.UPDATE_ITEM_SUCCESS:
        const data2 = {
          ... action.payload,
          createdAt: Timestamp.now(),
        }
        return {
          ...state,
          loading: false,
          items: state.items.map((item) =>
            item.id === action.payload.id ? data2 : item
          ),
        };
      case ItemActionKind.UPDATE_ITEM_FAILURE:
        return { ...state, loading: false, error: action.payload };

      //Deleting an Item
      case ItemActionKind.DELETE_ITEM_REQUEST:
        return { ...state, loading: true, error: null };
      case ItemActionKind.DELETE_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      case ItemActionKind.DELETE_ITEM_FAILURE:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ItemReducer;
