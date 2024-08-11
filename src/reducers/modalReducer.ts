import { ModalAction, ModalActionKind, ModalState } from "../types/modal";

export const initialState: ModalState = {
  isOpen: false,
  modal: null,
  method: null,
  item: null
};

const ModalReducer = (state: ModalState, action: ModalAction): ModalState => {
  // console.log("modalReducer", action);
  
  switch (action.type) {
    case ModalActionKind.OPEN:
      return {
        isOpen: true,
        modal: action.payload.modal,
        method: action.payload.method,
        item: action.payload.item
      };
    case ModalActionKind.CLOSE:
        return {
            isOpen: false,
            modal: null,
            method: null,
            item: null
          };
    default:
      return state;
  }
};

export default ModalReducer;
