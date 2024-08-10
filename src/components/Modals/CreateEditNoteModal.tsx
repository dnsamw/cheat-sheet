import { ModalMethods } from "../../types/modal";
import CheatForm from "../CheatForm";
import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
    method: ModalMethods
};

function CreateEditNoteModal({onModalClose, method}: Props) {
  return (
    <BaseModal method={method} titleSuffix="Note"  onClose={onModalClose}>
      <CheatForm />
    </BaseModal>
  );
}

export default CreateEditNoteModal;
