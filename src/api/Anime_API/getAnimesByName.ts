import axios from "axios";
import { CONSUMET_URL } from "../config";

export const getAnimesByName = async (name: string | string[]) => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/${name}`);
  const anime = response.data.results;
  return anime;
};
