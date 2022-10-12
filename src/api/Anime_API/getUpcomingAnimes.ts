import { animeApi } from './index';

export const getUpcomingAnimes = async (currentPage = 0) => {
  const anime = animeApi.getUpcomingAnimes({page: currentPage})
  return anime;
};
