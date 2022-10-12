import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { CONSUMET_URL } from "../config";

export const getAnimeSearchById = async (id: number) => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/advanced-search`,{params: {id: id}});
  const anime = response.data.results[0] as IAnimeResult;
  return anime;
};
