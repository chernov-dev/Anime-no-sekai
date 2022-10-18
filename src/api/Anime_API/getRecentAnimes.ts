import { isMobile } from 'react-device-detect';
import { IPagination } from './../../types/Pagination';
import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { CONSUMET_URL, JIKAN_URL } from "../config";

export const getRecentAnimes = async (currentPage = 0) => {
  const response = await axios.get(
    `${CONSUMET_URL}/meta/anilist/recent-episodes`, 
    {
      params: {perPage: isMobile ? 11 : 10, page: currentPage},
    }
  );
  const anime = response.data.results as IAnimeResult[];
  const pagination = Object.fromEntries(Object.entries(response.data as IPagination).slice(0, -1)) as IPagination;

  return {anime, pagination};
};
