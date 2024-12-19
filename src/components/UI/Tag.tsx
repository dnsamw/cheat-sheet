import "../../assets/scss/tag.scss";
import { Config } from "../../config/appConfig";
import { hexToRgba } from "../../utils";

type Props = {
  color: string;
  tag: string;
  onClick?: (tag: string) => void;
};

function Tag({ color, tag, onClick }: Props) {

  const handleClick = () => {
    if (onClick) {
      return onClick(tag);
    }
  };
  return (
    <li
      onClick={handleClick}
      style={{ backgroundColor: Config.colors.getBg(hexToRgba(color || "#ffff")), color: color }}
    >
      {tag}
    </li>
  );
}

export default Tag;
