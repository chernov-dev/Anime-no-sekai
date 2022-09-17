import { destructureJikanAPI_toObject } from '../utils/serializeToAnime';
import axios from "axios";
import { IAnime } from "../types/Anime";
import { JIKAN_URL, VOST_URL } from "./config";

export const getUpcomingAnimes = async (currentPage = 0) => {
  const itemsPerPage = 8;
  const response = await axios.get(`${JIKAN_URL}/seasons/upcoming`, {
    params: { order_by: "start_date", sort: "desc", status: "airing"},
  });
  const animes = destructureJikanAPI_toObject(response.data) as IAnime[];
  return animes;
};
