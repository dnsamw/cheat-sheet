import Tag from "./UI/Tag";
import CheatCode from "./CheatCode";
import { I_CheatItem } from "../types/item";
import { TagType } from "../types/tag";
import "../assets/scss/cheat-item.scss";
import { tagdata } from "./TagSelector";
import { LuFileEdit, LuTrash2 } from "react-icons/lu";
import { useData } from "../hooks/useData";
import { useState } from "react";
import YesNoDialogModal from "./UI/YesNoDialogModal";
type Props = {
  item: I_CheatItem;
};

function CheatItem({ item }: Props) {

  const [showConfirm, setShowConfirm] = useState(false);
  const {deleteCheatItem} = useData()

  const handleDeleteClick = ()=>{
    console.log("deleting", item.id);
    setShowConfirm(true);
  }

  
  const handleConfirm = (confirm:boolean) => {
    setShowConfirm(false);
    if (confirm) {
      console.log("DELETED")
      deleteCheatItem(item.id)
    }
  };

  return (
    <>
      <div className="cheat-item">
        <div className="cheat-title">{item.title}</div>
        <div className="cheat-text">{item.text}</div>
        {item.codes.map((code, index) => (
          <CheatCode key={index} code={code} />
        ))}
        <div className="cheat-tags">
          <ul>
            {item.tags.map((tag: TagType | string, i: number) => {
              if (typeof tag === "string") {
                const tagObject = tagdata.find(
                  (t) => t.name === tag
                ) as TagType;
                return (
                  <Tag
                    key={i}
                    tag={tagObject?.name}
                    color={tagObject?.color}
                    bgColor={tagObject.bgColor}
                  />
                );
              }
              return (
                <Tag
                  key={i}
                  bgColor={tag?.color + "3d"}
                  color={tag?.color}
                  tag={tag?.name}
                />
              );
            })}
          </ul>
        </div>
        <div className="cheat-actions">
          <span onClick={() => {}} className="edit-btn"><LuFileEdit/></span>
          <span onClick={handleDeleteClick} className="delete-btn"><LuTrash2/></span>
        </div>        
      </div>
      {showConfirm && <YesNoDialogModal onConfirm={handleConfirm} message={`Are you sure you want to delete "${item.title}" ?`}/>}
    </>
  );
}

export default CheatItem;
