import axios from "axios";
import { VOST_URL } from "./config";
import { getAnimeByName } from "./getAnimeByName";

export const getRandomAnime = async () => {
  const max = 2840;
  const randomValue = getRandomInRange(0, max);
  const response = await axios.post(
    `${VOST_URL}/info`,
    new URLSearchParams({
      id: `${randomValue}`,
    })
  );
  const { data: anime } = response.data;

  // let commaSeparatedGenres = data.genres.join(", ");
  // let formattedTitle = data.names.ru + " / " + data.names.en;

  // let id = await getIdByName(data.names.en);

  // let anime = {
  //   rating: data.in_favorites,
  //   description: data.description,
  //   urlImagePreview: `https://anilibria.tv${data.posters.medium.url}`,
  //   year: data.season.year,
  //   genre: commaSeparatedGenres,
  //   id: id,
  //   title: formattedTitle,
  //   type: data.type.string,
  // };
  return anime[0];
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random(min) * max);
}

export const getIdByName = async (name) => {
  const animes = await getAnimeByName(name);
  let id = animes[0].id;
  return id != Number || String ? id : undefined;
};
