export interface I_User {
  uuid: string;
  first_name: string;
  last_name: string;
  role: string;
  contact_number: string;
}

export interface I_UserInitialState {
  user: I_User | null;
  loading: boolean;
  error: string | null;
}

export interface UserContextType {
  state: I_UserInitialState;
  dispatch: React.Dispatch<UserAction>;
}

export interface UserAction {
  type: UserActionKind;
  payload?: I_User | string;
}

// An enum with all the types of actions to use in our reducer
export enum UserActionKind {
  
  FETCH_USER_REQUEST = "FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE = "FETCH_USER_FAILURE",

  CREATE_USER_REQUEST = "CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
  CREATE_USER_FAILURE = "CREATE_USER_FAILURE",

  UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE",

  DELETE_USER_REQUEST = "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE = "DELETE_USER_FAILURE",
}


export interface FetchUserRequestAction {
  type: UserActionKind.FETCH_USER_REQUEST;
}

export interface FetchUserSuccessAction {
  type: UserActionKind.FETCH_USER_SUCCESS;
  payload: I_User;
}

export interface FetchUserFailureAction {
  type: UserActionKind.FETCH_USER_FAILURE;
  payload: string;
}

export interface CreateUserRequestAction {
  type: UserActionKind.CREATE_USER_REQUEST;
}

export interface CreateUserSuccessAction {
  type: UserActionKind.CREATE_USER_SUCCESS;
  payload: I_User;
}

export interface CreateUserFailureAction {
  type: UserActionKind.CREATE_USER_FAILURE;
  payload: string;
}

export interface UpdateUserRequestAction {
  type: UserActionKind.UPDATE_USER_REQUEST;
}

export interface UpdateUserSuccessAction {
  type: UserActionKind.UPDATE_USER_SUCCESS;
  payload: I_User;
}

export interface UpdateUserFailureAction {
  type: UserActionKind.UPDATE_USER_FAILURE;
  payload: string;
}

export interface DeleteUserRequestAction {
  type: UserActionKind.DELETE_USER_REQUEST;
}

export interface DeleteUserSuccessAction {
  type: UserActionKind.DELETE_USER_SUCCESS;
  payload: string; // id of the deleted item
}

export interface DeleteUserFailureAction {
  type: UserActionKind.DELETE_USER_FAILURE;
  payload: string;
}

export type UserActionUnion =
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;
