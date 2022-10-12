import { animeApi } from './index';
import axios from "axios";
import { destructureJikanAPI_toObject } from "../../utils/serializeToAnime";
import { JIKAN_URL } from "../config";

export const getUpcomingAnimes = async (currentPage = 0) => {
  const anime = animeApi.getUpcomingAnimes({page: currentPage})
  return anime;
};
