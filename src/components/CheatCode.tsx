import { LuCopy, LuCopyCheck } from "react-icons/lu";
import "../assets/scss/cheat-code.scss";
import { useState } from "react";

type Props = {
  code: string;
  onSuccess: (message:string) => void;
};

function CheatCode({ code,onSuccess }: Props) {
  const handleClick = (code: string) => {
    navigator.clipboard.writeText(code);
    setCoppiedCode(true);
    onSuccess("success");
  };
  const [isCoppiedCode, setCoppiedCode] = useState(false);
  return (
    <div className="cheat-code">
      <code onClick={() => handleClick(code)}>
        <span>{code}</span>
        <i>
          {!isCoppiedCode ? (
            <LuCopy style={{ color: "white" }} />
          ) : (
            <LuCopyCheck style={{ color: "#7ee787" }} />
          )}
        </i>
      </code>
    </div>
  );
}

export default CheatCode;
