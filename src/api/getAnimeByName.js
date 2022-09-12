import axios from "axios";
import { VOST_URL } from "./config";

export const getAnimeByName = async (name) => {
  const response = await axios.post(
    `${VOST_URL}/search`,
    new URLSearchParams({
      name: `${name}`,
    })
  );
  const { data: animes } = response.data;
  return animes;
};
