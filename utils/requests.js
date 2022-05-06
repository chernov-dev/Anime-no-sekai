const BASE_URL = "https://api.animetop.info/v1";

const requests = {
  fetchLastAnimes: `${BASE_URL}/last`,
  fetchAnimeInfo: `${BASE_URL}/info`,
  fetchSearchAnime: `${BASE_URL}/search`,
  fetchAnimePlaylist: `${BASE_URL}/playlist`,
};

export default requests;
