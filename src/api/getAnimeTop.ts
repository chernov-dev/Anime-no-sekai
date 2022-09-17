import { destructureJikanAPI_toObject } from "../utils/serializeToAnime";
import axios from "axios";
import { JIKAN_URL } from "./config";
import { IAnime } from "../types/Anime";

export const getAnimeTop = async (_type: string) => {
  const response = await axios.get(
    `${JIKAN_URL}/top/anime`,
    // @ts-expect-error
    new URLSearchParams({
      type: _type,
      filter: "bypopularity",
      limit: 100,
    })
  );
  //Destructuring response into our formatted
  const animes = destructureJikanAPI_toObject(response.data) as IAnime[];
  return animes;
};
