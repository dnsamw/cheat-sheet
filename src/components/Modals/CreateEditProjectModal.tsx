import { ModalMethods } from "../../types/modal";
import BaseModal from "./BaseModal";

type Props = {
    onModalClose: () => void
    method: ModalMethods
};

function CreateEditProjectModal({onModalClose,method}: Props) {
  return (
    <BaseModal method={method} titleSuffix="Project" onClose={onModalClose}>
      <div>Create and Edit Project</div>
    </BaseModal>
  );
}

export default CreateEditProjectModal;
