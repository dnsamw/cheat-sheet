import { LuCopy, LuCopyCheck } from "react-icons/lu";
import "../assets/scss/cheat-code.scss";
import { useState } from "react";

type Props = {
  code: string;
};

function CheatCode({ code }: Props) {
  const handleClick = (code: string) => {
    navigator.clipboard.writeText(code);
    setCoppiedCode(true);
  };
  const [isCoppiedCode, setCoppiedCode] = useState(false);
  return (
    <div className="cheat-code">
      <code onClick={() => handleClick(code)}>
        {code}
        {!isCoppiedCode ? <LuCopy style={{ color: "white" }} /> : <LuCopyCheck style={{ color: "#7ee787" }}/>}
      </code>
    </div>
  );
}

export default CheatCode;
