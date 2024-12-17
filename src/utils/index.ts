import axios from "axios";
import * as cheerio from "cheerio";
import { CACHE_EXPIRATION } from "../reducers/intemReducer";
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

export const isCacheValid = (lastFetched: number | null) => {
  if (!lastFetched) return false;
  return Date.now() - lastFetched < CACHE_EXPIRATION;
};

// sort a list of items by date
export const sortByUpdatedDate = <T extends { updatedAt: number | string }>(
  items: T[]
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = typeof a.updatedAt === 'number' ? a.updatedAt : new Date(a.updatedAt).getTime();
    const dateB = typeof b.updatedAt === 'number' ? b.updatedAt : new Date(b.updatedAt).getTime();
    return dateB - dateA;
  });
}

export const  hexToRgba = (hex: string) =>{
  // Remove the hash (#) if it exists
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the rgba string
  return `rgb(${r}, ${g}, ${b})`;
}
