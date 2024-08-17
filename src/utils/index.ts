import axios from "axios";
import * as cheerio from "cheerio";
export {};

export const getLightshotImageHtml = async (path: string) => {
  try {
    const { data } = await axios.get(path);
    const $ = cheerio.load(data);

    // Extract the content value from the metadata tag
    const imageUrl = $('meta[property="og:image"]').attr("content");
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const extractLightShotImgShortId = (url: string) => {
  const urlParts = url.split("prnt.sc");
  return urlParts[urlParts.length - 1];
};
