import {
    I_UserInitialState,
    UserActionKind,
    UserActionUnion,
  } from "../types/user";
  
  export const initialState: I_UserInitialState = {
    user: null,
    role: null,
    loading: false,
    error: null,
  };
  
  const UserReducer = (
    state: I_UserInitialState = initialState,
    action: UserActionUnion
  ): I_UserInitialState => {
    switch (action.type) {
  
        //Creating a User
        case UserActionKind.CREATE_USER_REQUEST:
          return { ...state, loading: true, error: null };
          
        case UserActionKind.CREATE_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            user: action.payload
          };

        case UserActionKind.CREATE_USER_FAILURE:
          return { ...state, loading: false, error: action.payload };
  
        //Deleting an User
        case UserActionKind.DELETE_USER_REQUEST:
          return { ...state, loading: true, error: null };

        case UserActionKind.DELETE_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            user: null,
          };
        case UserActionKind.DELETE_USER_FAILURE:
          return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
  };
  
  export default UserReducer;
  