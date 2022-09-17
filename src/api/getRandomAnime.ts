import axios from "axios";
import { JIKAN_URL } from "./config";

export const getRandomId = async () => {
  const response = await axios.get(`${JIKAN_URL}/random/anime`);
  const {data: {mal_id: id}} = response.data;
  return id as number;
};

