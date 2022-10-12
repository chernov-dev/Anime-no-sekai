import { IPagination } from './../../types/Pagination';
import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { CONSUMET_URL } from "../config";

export const getAnimeTop = async (currentPage = 1) => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/popular`, {
    params: { perPage: 50, page: currentPage},
  });
  //Destructuring response into our formatted
  const anime = response.data.results as IAnimeResult[];
  const pagination = Object.fromEntries(Object.entries(response.data as IPagination).slice(0, -1)) as IPagination;

  return {anime, pagination};
};
