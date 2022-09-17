import { IAnime } from './../types/Anime';

export const destructureJikanAPI_toObject = ({data} : {data: [] | {}}) => {
  const serializeArr = data as []
  const serializeObject = data as {}
  let serialized : IAnime[] | IAnime;
 
  
  if(Array.isArray(data)) {
    serialized = serializeArr.map((serializedIndex => serialize(serializedIndex))
   );
  } else {
    //@ts-expect-error
    serialized = serialize(serializeObject);
  }
  
  return serialized;
};

function isObject(object: {} | []): object is {} {
  return (object as {}) !== undefined;
}

export function isArray(array: {} | []): array is [] {
 return (array as []) !== undefined;
}
function serialize({mal_id, url, images, trailer, title_english, title_japanese, type, source, episodes, status, airing, duration, rating, score, scored_by, rank, popularity, favorites, synopsis, season, year, genres, themes, demographics}) {
  let id = mal_id;
  return {id, url, images, trailer, titles : {en: title_english, ja: title_japanese}, type, source, episodes, status, airing, duration, rating, score, scored_by, rank, popularity, favorites, synopsis, season, year, genres, themes, demographics} as IAnime;
}
