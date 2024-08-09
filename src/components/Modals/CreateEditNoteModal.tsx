import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
};

function CreateEditNoteModal({onModalClose}: Props) {
  return (
    <BaseModal title="Create and Edit Note"  onClose={onModalClose}>
      <div>Create and Edit Note</div>
    </BaseModal>
  );
}

export default CreateEditNoteModal;
