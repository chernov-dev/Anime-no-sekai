import axios from "axios";
import { CONSUMET_URL } from "../config";

export const getEpisodeStreamingLinks = async (episodeId = 0) => {
  // axios.defaults.withCredentials = true;
  const response = await axios.get(
    `${CONSUMET_URL}/meta/anilist/watch/${episodeId}`,
  );
  const playlist = response.data;
  return playlist;
};
