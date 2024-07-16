import Tag from "./UI/Tag";
import CheatCode from "./CheatCode";
import { I_CheatItem } from "../types/item";
import { TagType } from "../types/tag";
import "../assets/scss/cheat-item.scss";
type Props = {
  item: I_CheatItem;
};

function CheatItem({ item }: Props) {
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
            {item.tags.map((tag: TagType, i: number) => (
              <Tag
                key={i}
                bgColor={tag.color + "3d"}
                color={tag.color}
                tag={tag.name}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CheatItem;
