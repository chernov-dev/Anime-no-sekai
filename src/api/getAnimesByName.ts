import axios from "axios";
import { IAnime } from "../types/Anime";
import { destructureJikanAPI_toObject } from "../utils/serializeToAnime";
import { JIKAN_URL } from "./config";

export const getAnimesByName = async (name: string | string[]) => {
  const response = await axios.get(`${JIKAN_URL}/anime`, {
    params: { q: name },
  });
  const animes = destructureJikanAPI_toObject(response.data) as IAnime[];
  return animes;
};
