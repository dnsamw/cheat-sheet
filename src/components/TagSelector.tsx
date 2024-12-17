import { useState } from "react";
import { LuXCircle } from "react-icons/lu";
import Tag from "./UI/Tag";
import { TagType } from "../types/tag";
import useUiSelector from "../redux/ui/uiSelector";
import { Config } from "../config/appConfig";

import "../assets/scss/tag-selector.scss";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export const tagdata: TagType[] = [
  { name: "Laravel", color: Config.colors.laravel},
  { name: "Git", color: Config.colors.git },
  { name: "TypeScript", color: Config.colors.typeScript},
  { name: "React", color: Config.colors.react },
  { name: "Redux", color: Config.colors.redux },
  { name: "Docker", color: Config.colors.docker },
  { name: "Nginx", color: Config.colors.nginx },
  { name: "Linux", color: Config.colors.linux },
  { name: "Other", color: Config.colors.gold },
  { name: "FanClub", color: Config.colors.gold },
  { name: "J-League", color: Config.colors.gold },
  // { name: "J-League", color: "#c9ab81", bgColor: "#c9ab813d" },
];

const TagSelector:React.ForwardRefRenderFunction<HTMLDivElement, Props> = ({ value, onChange }, ref)=>{
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {tags} = useUiSelector();

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
      {tags.map((tag: any, i: number) => (
        <span className="tag-wrapper" key={i}>
          <Tag
            tag={tag.name}
            color={tag.color}
            onClick={handleTagClick}
          />
        </span>
      ))}
      </div>
    </div>
  );
}

export default TagSelector;
