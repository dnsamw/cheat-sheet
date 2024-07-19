import { TagType } from "../types/tag";
import Tag from "./UI/Tag";
import "../assets/scss/tag-selector.scss";
import { useState } from "react";
import { LuXCircle } from "react-icons/lu";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export const tagdata: TagType[] = [
  { name: "Laravel", color: "#ff6000", bgColor: "#ff60003d" },
  { name: "Git", color: "#7d00ff", bgColor: "#7d00ff3d" },
  { name: "TypeScript", color: "#0084ff", bgColor: "#0084ff3d" },
  { name: "React", color: "#03a9f4", bgColor: "#03a9f43d" },
  { name: "Redux", color: "#673ab7", bgColor: "#673ab73d" },
  { name: "Docker", color: "#8ed1fc", bgColor: "#8ed1fc3d" },
  { name: "Nginx", color: "#4caf50", bgColor: "#4caf503d" },
  { name: "Linux", color: "#ffc300", bgColor: "#ffc3003d" },
  { name: "Other", color: "#c9ab81", bgColor: "#c9ab813d" },
  { name: "FanClub", color: "#c9ab81", bgColor: "#c9ab813d" },
  { name: "J-League", color: "#c9ab81", bgColor: "#c9ab813d" },
];

const TagSelector:React.ForwardRefRenderFunction<HTMLDivElement, Props> = ({ value, onChange }, ref)=>{
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tagName: string) => {
    if (tagName && !value.includes(tagName)) {
      onChange([...value, tagName]);
    }
  };

  const handleRemoveTag = (tagName: string) => {
    onChange(value.filter((t) => t !== tagName));
  };

  return (
    <div>
      <div className="selected-tags">
        {value.map((tag: string, i: number) => (
          <span key={i}>
            {tag}{" "}
            <LuXCircle
              onClick={() => handleRemoveTag(tag)}
              className="close-btn"
            />
          </span>
        ))}
      </div>
      <div className="tag-lables">
      {tagdata.map((tag: any, i: number) => (
        <span className="tag-wrapper" key={i}>
          <Tag
            tag={tag.name}
            color={tag.color}
            bgColor={tag.bgColor}
            onClick={handleTagClick}
          />
        </span>
      ))}
      </div>
    </div>
  );
}

export default TagSelector;
