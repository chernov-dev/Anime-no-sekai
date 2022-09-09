import axios from "axios";
import { BASE_URL } from "./config";

export const getLastAnimes = async (currentPage = 0) => {
  const itemsPerPage = 8;
  const response = await axios.get(
    `${BASE_URL}/last?page=${currentPage}&quantity=${itemsPerPage}`
  );
  const { data: animes } = response.data;
  return animes;
};
