export interface I_CheatItem {
  id: string;
  title: string;
  text: string;
  codes: string[];
  tags: TagType[];
}

export type TagType = {
  name: string;
  color: string;
};

export interface I_ItemInitialState {
  items: I_CheatItem[];
  loading: boolean;
  error: string | null;
}

export interface ItemContextType {
  state: I_ItemInitialState;
  dispatch: React.Dispatch<ItemAction>;
}

export interface ItemAction {
  type: ItemActionKind;
  payload?: I_CheatItem[] | string;
}

// An enum with all the types of actions to use in our reducer
export enum ItemActionKind {
  FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST",
  FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS",
  FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE",
}

export interface FetchItemsSuccessAction {
  type: ItemActionKind.FETCH_ITEMS_SUCCESS;
  payload: I_CheatItem[];
}

export interface FetchItemsFailureAction {
  type: ItemActionKind.FETCH_ITEMS_FAILURE;
  payload: string;
}

export type ItemActionUnion =
  | { type: ItemActionKind.FETCH_ITEMS_REQUEST }
  | FetchItemsSuccessAction
  | FetchItemsFailureAction;
