import {
  I_ItemInitialState,
  ItemActionKind,
  ItemActionUnion,
} from "../types/item";

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
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
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
        return {
          ...state,
          loading: false,
          items: [...state.items, action.payload],
        };
      case ItemActionKind.CREATE_ITEM_FAILURE:
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
