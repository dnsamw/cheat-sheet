import { TagType } from "../types/tag";
import Tag from "./UI/Tag";
import "../assets/scss/tag-selector.scss";
import { useState } from "react";
import { LuXCircle } from "react-icons/lu";

type Props = {};

const tagdata: TagType[] = [
  { name: "Laravel", color: "#ff6000", bgColor: "#ff60003d" },
  { name: "Git", color: "#7d00ff", bgColor: "#7d00ff3d" },
  { name: "TypeScript", color: "#0084ff", bgColor: "#0084ff3d" },
  { name: "Other", color: "#c9ab81", bgColor: "#c9ab813d" },
  { name: "FanClub", color: "#c9ab81", bgColor: "#c9ab813d" },
  { name: "J-League", color: "#c9ab81", bgColor: "#c9ab813d" },
];

function TagSelector({}: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tagName: string) => {
    if (tagName) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  return (
    <div>
      <div className="selected-tags">
        {selectedTags.map((tag: string, i: number) => (
          <span>
            {tag}{" "}
            <LuXCircle
              onClick={() =>
                setSelectedTags(selectedTags.filter((t) => t !== tag))
              }
              className="close-btn"
            />
          </span>
        ))}
      </div>
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
  );
}

export default TagSelector;
