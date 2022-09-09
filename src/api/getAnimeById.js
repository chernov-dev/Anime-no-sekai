import axios from "axios";
import { BASE_URL } from "./config";

export const getAnimeById = async (id) => {
  const response = await axios.post(
    `${BASE_URL}/info`,
    new URLSearchParams({
      id: `${id}`,
    })
  );

  const { data: anime } = response.data;

  return anime[0];
};
