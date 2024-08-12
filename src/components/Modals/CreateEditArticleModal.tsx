import { ModalMethods } from "../../types/modal";
import ArticleForm from "../ArticleForm";
import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
    method: ModalMethods;
};

function CreateEditArticleModal({onModalClose,method}: Props) {

  return (
    <>
      <BaseModal method={method} titleSuffix="Article" onClose={onModalClose}>
       <ArticleForm />
      </BaseModal>
    </>
  );
}

export default CreateEditArticleModal;
