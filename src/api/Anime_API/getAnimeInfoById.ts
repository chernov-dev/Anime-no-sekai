import { IAnimeInfo } from '../../types/Anime';
import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { CONSUMET_URL } from "../config";

export const getAnimeInfoById = async (id: number) => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/info/${id}`);
  const anime = response.data as IAnimeInfo;
  return anime;
};
