import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { CONSUMET_URL } from "../config";

export const getAnimeTrending = async () => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/trending`, {
    params: { perPage: 9},
  });
  //Destructuring response into our formatted
  const anime = response.data.results as IAnimeResult[];
  return anime;
};
