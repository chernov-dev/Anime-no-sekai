import axios from "axios";
import { BASE_URL } from "./config";

export const getPlaylistById = async (id) => {
  const response = await axios.post(
    `${BASE_URL}/playlist`,
    new URLSearchParams({
      id: `${id}`,
    })
    // {
    //   headers: {
    //     "access-control-allow-origin": "*",
    //   },
    // }
  );
  const { data: playlist } = response;
  //Sort playlist by their episode name, eg. 1 Episode - 6 Episode
  const sortedPlaylist = playlist.sort(
    (a, b) => a.name.split(" ")[0] - b.name.split(" ")[0]
  );
  return sortedPlaylist;
};
