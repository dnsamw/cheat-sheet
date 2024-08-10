import CheatForm from "../CheatForm";
import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
};

function CreateEditNoteModal({onModalClose}: Props) {
  return (
    <BaseModal title="Create and Edit Note"  onClose={onModalClose}>
      <CheatForm />
    </BaseModal>
  );
}

export default CreateEditNoteModal;
