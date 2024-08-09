import React from "react";
import "../../assets/scss/yes-no-dialog-modal.scss";

type Props = {
  message?: string;
  onConfirm: (value: boolean) => void;
};

function YesNoDialogModal({ message, onConfirm }: Props) {
  return (
    <div className="confirm-dialog-wrapper">
      <div className="confirm-dialog">
        <p className="message">{message || "Are you sure ?"}</p>
        <div className="actions">
        <button className="confirm" onClick={() => onConfirm(true)}>Yes</button>
        <button className="cancel" onClick={() => onConfirm(false)}>No</button>
        </div>
      </div>
    </div>
  );
}

export default YesNoDialogModal;
