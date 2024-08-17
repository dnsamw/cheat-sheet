import "../../assets/scss/post-thumb-placeholder.scss";
import { useCallback, useEffect, useState } from "react";
import { extractLightShotImgShortId, getLightshotImageHtml } from "../../utils";
import { LuImage } from "react-icons/lu";
import { useDebounce } from "../../hooks/useDebounce";

type Props = {
  imgUrl?: string;
};

function PostThumbPlaceholder({ imgUrl }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [thumbUrl, setThumbUrl] = useState<string | null | undefined>("");

  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchThumbUrl = async () => {
      if (debouncedInputValue) {
        const thumbId = extractLightShotImgShortId(debouncedInputValue);
        const newThumbUrl = await getLightshotImageHtml(thumbId);
        setThumbUrl(newThumbUrl);
      }
    };

    fetchThumbUrl();
  }, [debouncedInputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="post-thumb-werapper">
      <input
        type="text"
        placeholder="https://prnt.sc/example"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="post-placeholder_wide">
        {thumbUrl ? <img src={thumbUrl} alt="post" /> : <LuImage />}
      </div>
    </div>
  );
}

export default PostThumbPlaceholder;
