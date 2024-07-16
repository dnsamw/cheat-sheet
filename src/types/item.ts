import { TagType } from "./tag";

export interface I_CheatItem {
  id: string;
  title: string;
  text: string;
  codes: string[];
  tags: TagType[];
}

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
  payload?: I_CheatItem | I_CheatItem[] | string;
}

// An enum with all the types of actions to use in our reducer
export enum ItemActionKind {
  FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST",
  FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS",
  FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE",
  FETCH_ITEM_REQUEST = "FETCH_ITEM_REQUEST",
  FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS",
  FETCH_ITEM_FAILURE = "FETCH_ITEM_FAILURE",
  CREATE_ITEM_REQUEST = "CREATE_ITEM_REQUEST",
  CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS",
  CREATE_ITEM_FAILURE = "CREATE_ITEM_FAILURE",
  UPDATE_ITEM_REQUEST = "UPDATE_ITEM_REQUEST",
  UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS",
  UPDATE_ITEM_FAILURE = "UPDATE_ITEM_FAILURE",
  DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST",
  DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS",
  DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE",
}

export interface FetchItemsRequestAction {
  type: ItemActionKind.FETCH_ITEMS_REQUEST;
}

export interface FetchItemsSuccessAction {
  type: ItemActionKind.FETCH_ITEMS_SUCCESS;
  payload: I_CheatItem[];
}

export interface FetchItemsFailureAction {
  type: ItemActionKind.FETCH_ITEMS_FAILURE;
  payload: string;
}

export interface FetchItemRequestAction {
  type: ItemActionKind.FETCH_ITEM_REQUEST;
}

export interface FetchItemSuccessAction {
  type: ItemActionKind.FETCH_ITEM_SUCCESS;
  payload: I_CheatItem;
}

export interface FetchItemFailureAction {
  type: ItemActionKind.FETCH_ITEM_FAILURE;
  payload: string;
}

export interface CreateItemRequestAction {
  type: ItemActionKind.CREATE_ITEM_REQUEST;
}

export interface CreateItemSuccessAction {
  type: ItemActionKind.CREATE_ITEM_SUCCESS;
  payload: I_CheatItem;
}

export interface CreateItemFailureAction {
  type: ItemActionKind.CREATE_ITEM_FAILURE;
  payload: string;
}

export interface UpdateItemRequestAction {
  type: ItemActionKind.UPDATE_ITEM_REQUEST;
}

export interface UpdateItemSuccessAction {
  type: ItemActionKind.UPDATE_ITEM_SUCCESS;
  payload: I_CheatItem;
}

export interface UpdateItemFailureAction {
  type: ItemActionKind.UPDATE_ITEM_FAILURE;
  payload: string;
}

export interface DeleteItemRequestAction {
  type: ItemActionKind.DELETE_ITEM_REQUEST;
}

export interface DeleteItemSuccessAction {
  type: ItemActionKind.DELETE_ITEM_SUCCESS;
  payload: string; // id of the deleted item
}

export interface DeleteItemFailureAction {
  type: ItemActionKind.DELETE_ITEM_FAILURE;
  payload: string;
}

export type ItemActionUnion =
  | FetchItemsRequestAction
  | FetchItemsSuccessAction
  | FetchItemsFailureAction
  | FetchItemRequestAction
  | FetchItemSuccessAction
  | FetchItemFailureAction
  | CreateItemRequestAction
  | CreateItemSuccessAction
  | CreateItemFailureAction
  | UpdateItemRequestAction
  | UpdateItemSuccessAction
  | UpdateItemFailureAction
  | DeleteItemRequestAction
  | DeleteItemSuccessAction
  | DeleteItemFailureAction;
