import { ModalMethods } from "../../types/modal";
import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
    method: ModalMethods;
};

function CreateEditArticleModal({onModalClose,method}: Props) {

  return (
    <>
      <BaseModal method={method} titleSuffix="Article" onClose={onModalClose}>
        <div></div>
      </BaseModal>
    </>
  );
}

export default CreateEditArticleModal;
