import axios from "axios";
import { ANILIBRIA_URL } from "./config";

export const getRandomAnime = async () => {
  const response = await axios.get(`${ANILIBRIA_URL}/getRandomTitle`);

  const { data } = response;

  let commaSeparatedGenres = data.genres.join(", ");
  let formattedTitle = data.names.ru + " / " + data.names.en;

  let anime = {
    rating: data.in_favorites,
    description: data.description,
    urlImagePreview: `https://anilibria.tv${data.posters.medium.url}`,
    year: data.season.year,
    genre: commaSeparatedGenres,
    id: data.id,
    title: formattedTitle,
    type: data.type.string,
  };
  return anime;
};
