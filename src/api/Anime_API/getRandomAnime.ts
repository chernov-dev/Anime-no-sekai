import axios from "axios";
import { CONSUMET_URL } from "../config";

export const getRandomAnimeId = async () => {
  const response = await axios.get(`${CONSUMET_URL}/meta/anilist/random-anime`);
  const {id} = response.data;
  return id as number;
};
