import React from "react";
import "../../assets/scss/modals/base-modal.scss";
import { LuXCircle } from "react-icons/lu";
import { ModalMethods } from "../../types/modal";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  titleSuffix: string;
  method: ModalMethods;
};

function BaseModal({ method ,titleSuffix,children,onClose }: Props) {

  const generateTitle = (method:ModalMethods) => {
    switch (method) {
      case ModalMethods.CREATE:
        return "Create";
      case ModalMethods.EDIT:
        return "Edit";
      default:
        return "Create";
    }
  }

  return (
    <div className="fixed-modal-container">
      <div className="base-modal-wrapper">
        <div className="modal-header">
        <div className="close-modal" onClick={onClose}><LuXCircle /></div>
          <h3>{generateTitle(method)} {titleSuffix}</h3>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}

export default BaseModal;
