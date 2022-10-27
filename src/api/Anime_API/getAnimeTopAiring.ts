import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { CONSUMET_URL } from "../config";

export const getAnimeTopAiring = async () => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/advanced-search`, {
    params: { perPage: 9, status: "RELEASING"},
  });
  //Destructuring response into our formatted
  const anime = response.data.results as IAnimeResult[];
  return anime;
};
