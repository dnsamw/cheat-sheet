import Tag from "./UI/Tag";
import CheatCode from "./CheatCode";
import { I_CheatItem } from "../types/item";
import { TagType } from "../types/tag";
import "../assets/scss/cheat-item.scss";
import { tagdata } from "./TagSelector";
import { LuFileEdit, LuTrash2 } from "react-icons/lu";
import { useData } from "../hooks/useData";
type Props = {
  item: I_CheatItem;
};

function CheatItem({ item }: Props) {

  const {deleteCheatItem} = useData()

  const handleDelete = ()=>{
    console.log("delete", item.id);
    deleteCheatItem(item.id)
  }

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
          <span onClick={handleDelete} className="delete-btn"><LuTrash2/></span>
        </div>        
      </div>
    </>
  );
}

export default CheatItem;
