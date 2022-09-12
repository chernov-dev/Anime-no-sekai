import axios from "axios";
import { VOST_URL } from "./config";

export const getLastAnimes = async (currentPage = 0) => {
  const itemsPerPage = 8;
  const response = await axios.get(
    `${VOST_URL}/last?page=${currentPage}&quantity=${itemsPerPage}`
  );
  const { data: animes } = response.data;
  return animes;
};
