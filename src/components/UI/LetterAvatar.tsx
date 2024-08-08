import { useEffect, useMemo } from "react";
import "../../assets/scss/letter-avatar.scss";
type Props = {
  text: string | null;
};

function LetterAvatar({ text }: Props) {  
  
  const letter = text?.slice(0, 1).toUpperCase();
  const rendomBgColor = useMemo(()=>Math.floor(Math.random() * 16777215).toString(16),[]);

  if (!letter) return null;

  return (
    <div
      className="letter-avatar"
      style={{ backgroundColor: `#${rendomBgColor}` }}
    >
      {letter}
    </div>
  );
}

export default LetterAvatar;
