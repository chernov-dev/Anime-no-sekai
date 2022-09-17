import axios from "axios";
import { IAnime } from "../types/Anime";
import { destructureJikanAPI_toObject } from "../utils/serializeToAnime";
import { JIKAN_URL } from "./config";

export const getAnimeById = async (id: number) => {
  const response = await axios.get(`${JIKAN_URL}/anime/${id}`);
  const anime = destructureJikanAPI_toObject(response.data) as IAnime;
  return anime;
};
