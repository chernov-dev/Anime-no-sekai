import axios from "axios";
import { BASE_URL } from "./config";

export const getAnimeByName = async (name) => {
  const response = await axios.post(
    `${BASE_URL}/search`,
    new URLSearchParams({
      name: `${name}`,
    })
  );
  const { data: animes } = response.data;
  return animes;
};
