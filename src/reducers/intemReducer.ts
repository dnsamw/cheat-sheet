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
    default:
      return state;
  }
};

export default ItemReducer;
