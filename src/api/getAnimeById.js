import axios from "axios";
import { VOST_URL } from "./config";

export const getAnimeById = async (id) => {
  const response = await axios.post(
    `${VOST_URL}/info`,
    new URLSearchParams({
      id: `${id}`,
    })
  );

  const { data: anime } = response.data;

  return anime[0];
};
