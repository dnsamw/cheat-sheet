import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
};

function CreateEditProjectModal({onModalClose}: Props) {
  return (
    <BaseModal title="Create and Edit Project" onClose={onModalClose}>
      <div>Create and Edit Project</div>
    </BaseModal>
  );
}

export default CreateEditProjectModal;
