import { I_CheatItem } from "./item";

export enum ModalTypes {
  YES_NO_DIALOG = "YES_NO_DIALOG",
  CREATE_EDIT_ARTICLE_MODAL = "CREATE_EDIT_ARTICLE_MODAL",
  CREATE_EDIT_NOTE_MODAL = "CREATE_EDIT_NOTE_MODAL",
  CREATE_EDIT_PROJECT_MODAL = "CREATE_EDIT_PROJECT_MODAL",
  CREATE_EDIT_TAG_MODAL = "CREATE_EDIT_TAG_MODAL",
}

export enum ModalMethods {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export type ModalState = {
  isOpen: boolean;
  modal: ModalTypes | null;
  method: ModalMethods | null;
  item: I_CheatItem | any;
};

export enum ModalActionKind {
    OPEN="OPEN",
    CLOSE="CLOSE"
}

export type ModalAction = {
  type: string;
  payload: {
    isOpen: boolean;
    modal: ModalTypes | null;
    method: ModalMethods | null;
    item: I_CheatItem | any;
  };
}