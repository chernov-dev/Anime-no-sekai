import { IGenre } from "./Genre";
export interface IAnime {
  id: number;
  url: string;
  images: {
    jpg: { image_url: string; small_image_url: string; large_image_url: string },
    webp: { image_url: string; small_image_url: string; large_image_url: string };
  };
  trailer: string;
  titles: { en: string; ja: string };
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  favorites: number;
  synopsis: string;
  season: string;
  year: number;
  genres: IGenre[];
  themes: IGenre[];
  demographics: IGenre[];
}
