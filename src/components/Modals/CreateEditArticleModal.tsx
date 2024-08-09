import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
};

function CreateEditArticleModal({onModalClose}: Props) {
  return (
    <>
      <BaseModal title="Create and Edit Article"  onClose={onModalClose}>
        <div>Create and Edit Artile</div>
      </BaseModal>
    </>
  );
}

export default CreateEditArticleModal;
