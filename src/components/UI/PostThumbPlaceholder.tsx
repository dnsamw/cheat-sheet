import "../../assets/scss/post-thumb-placeholder.scss";
import { useEffect, useState } from "react";
import { extractLightShotImgShortId, getLightshotImageHtml } from "../../utils";
import { LuImage } from "react-icons/lu";
import { useDebounce } from "../../hooks/useDebounce";
import { z } from "zod";

type Props = {
  imgUrl?: string;
  onChange: (value: string) => void;
};

function PostThumbPlaceholder({ imgUrl, onChange }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [thumbUrl, setThumbUrl] = useState<string | null | undefined>("");

  const debouncedInputValue = useDebounce(inputValue, 300);

  const validateUrl = (url: string) => {
    const lightshotUrlRegex = /^https:\/\/prnt\.sc\/[a-zA-Z0-9]/;

    const schema = z.string().regex(lightshotUrlRegex);

    const result = schema.safeParse(url);
    console.log("result", result);
    
    return result.success; 
  };

  useEffect(() => {
    const fetchThumbUrl = async () => {
      if (debouncedInputValue) {
        const thumbId = extractLightShotImgShortId(debouncedInputValue);
        const newThumbUrl = await getLightshotImageHtml(thumbId);
        setThumbUrl(newThumbUrl);
      }
    };
    console.log("is valida url", validateUrl(inputValue));
    
    // if the url is valid, fetch the image
    if (validateUrl(inputValue)) {      
      fetchThumbUrl();
    }
  }, [debouncedInputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbUrl(null);
    setInputValue(e.target.value);
    onChange(e.target.value);
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
