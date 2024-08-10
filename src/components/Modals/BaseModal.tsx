import React from "react";
import "../../assets/scss/modals/base-modal.scss";
import { LuXCircle } from "react-icons/lu";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};

function BaseModal({ title,children,onClose }: Props) {
  return (
    <div className="fixed-modal-container">
      <div className="base-modal-wrapper">
        <div className="modal-header">
        <div className="close-modal" onClick={onClose}><LuXCircle /></div>
          <h3>{title}</h3>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}

export default BaseModal;
