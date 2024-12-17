  import { LuCopy, LuCopyCheck } from "react-icons/lu";
  import { useEffect, useRef, useState } from "react";
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";
  import "../assets/scss/cheat-code.scss";

  type Props = {
    code: string;
    onSuccess: (message: string) => void;
    language?: string;
  };

  function CheatCode({ code, onSuccess, language = "typescript" }: Props) {

    const [isCoppiedCode, setCoppiedCode] = useState(false);
    const codeEl = useRef<HTMLPreElement>(null);

    const handleClick = (code: string) => {
      navigator.clipboard.writeText(code);
      setCoppiedCode(true);
      onSuccess("success");
    };

    useEffect(() => {
      if (codeEl.current && !codeEl.current.dataset.highlighted) {
        hljs.highlightElement(codeEl.current);
      }
    }, [code, language]);

    return (
      <div className="cheat-code">
        <code onClick={() => handleClick(code)}>
          <pre
            ref={codeEl}
            style={{
              textAlign: "left",
              fontSize: "16px",
              padding: "0.5em",
              background: "none",
            }}
          >
            {code}
          </pre>
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
