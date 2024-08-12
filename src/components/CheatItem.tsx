import { useState } from "react";
import { LuFileEdit, LuMoreHorizontal, LuTrash2 } from "react-icons/lu";
import Tag from "./UI/Tag";
import CheatCode from "./CheatCode";
import YesNoDialogModal from "./UI/YesNoDialogModal";
import { tagdata } from "./TagSelector";
import { I_CheatItem } from "../types/item";
import { TagType } from "../types/tag";
import {useDataOperations} from "../hooks/useDataOperations";
import { ToastContainer, toast } from "react-toastify";
import { useModal } from "../contexts/modalContext";
import { ModalActionKind, ModalMethods, ModalTypes } from "../types/modal";

import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/cheat-item.scss";
import ItemInfo from "./UI/ItemInfo";
type Props = {
  item: I_CheatItem;
  isLoggedIn: boolean;
};

function CheatItem({ item, isLoggedIn }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  // const [isModalOpen, setModalOpen] = useState(false);
  const { deleteCheatItem } = useDataOperations();
  const { dispatch } = useModal();

  const handleDeleteClick = () => {
    // console.log("deleting", item.id);
    setShowConfirm(true);
  };

  const handleConfirm = (confirm: boolean) => {
    setShowConfirm(false);
    if (confirm) {
      // console.log("DELETED")
      deleteCheatItem(item.id);
    }
  };

  const handleSuccess = () => {
    // console.log("copied");
    
    toast.success("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="cheat-item">
        <div className="more-options">
          <LuMoreHorizontal />
        </div>
        <div className="cheat-title">
          {item.title}
        </div>
        <div
          className="cheat-text"
          dangerouslySetInnerHTML={{ __html: item.text }}
        />
        {item.codes.map((code, index) => (
          <CheatCode key={index} code={code} onSuccess={handleSuccess} />
        ))}
        <div className="cheat-tags">
          <ul>
            {item.tags.map((tag: TagType | string, i: number) => {
              if (typeof tag === "string") {
                const tagObject = tagdata.find(
                  (t) => t.name === tag
                ) as TagType;
                return (
                  <Tag key={i} tag={tagObject?.name} color={tagObject?.color} />
                );
              }
              return <Tag key={i} color={tag?.color} tag={tag?.name} />;
            })}
          </ul>
        </div>
        {isLoggedIn && (
          <div className="cheat-actions">
            <span onClick={() => dispatch({
              type: ModalActionKind.OPEN,
              payload: {
                isOpen: true,
                modal: ModalTypes.CREATE_EDIT_NOTE_MODAL,
                method: ModalMethods.EDIT,
                item:item,
              },
            })} className="edit-btn">
              <LuFileEdit />
            </span>
            <span onClick={handleDeleteClick} className="delete-btn">
              <LuTrash2 />
            </span>
          </div>
        )}
        <ItemInfo />
      </div>
      {showConfirm && (
        <YesNoDialogModal
          onConfirm={handleConfirm}
          message={`Are you sure you want to delete "${item.title}" ?`}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default CheatItem;
