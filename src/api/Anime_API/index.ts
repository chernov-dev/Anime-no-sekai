import axios from "axios";
import { IAnimeResult } from "../../types/Anime";
import { IPagination } from "../../types/Pagination";
import { CONSUMET_URL } from "../config";

const AnimeProviders = {
  ANIMEPAHE: "animepahe",
  GOGO: "gogoanime",
  ZORO: "zoro",
  ENIME: "enime",
};

export type AnimeProvider = keyof typeof AnimeProviders;

export class AnimeApi {
  host = CONSUMET_URL;
  provider;

  constructor(provider: AnimeProvider = "GOGO") {
    this.provider = AnimeProviders[provider];
  }

  async consumetApiGetCall(path: string = "", params = {}) {
    const url = `${this.host}${path.startsWith("/") ? path : `/${path}`}`;
    return (
      await axios.get(url, {
        params: {
          provider: this.provider,
          ...params,
        },
      })
    ).data;
  }

  async advancedSearch(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/advanced-search", params).then((data) => data.results);
  }

  async getRandom(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/random-anime", params);
  }

  async getAnimeById(id: string | number, params = {}) {
    return this.consumetApiGetCall("/meta/anilist/info/" + id, params);
  }

  async getTrending(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/trending", params).then((data) => data.results);
  }

  async getRecentEpisodes(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/recent-episodes", {
      perPage: 15,
      ...params,
    }).then((data) => ({
      anime: data.results,
      pagination: Object.fromEntries(
        Object.entries(data as IPagination).slice(0, -1) 
      ) as IPagination,
    }));
  }

  async getPopular(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/popular", {
      perPage: 50,
      ...params,
    }).then((data) => ({
      anime: data.results,
      pagination: Object.fromEntries(
        Object.entries(data as IPagination).slice(0, -1) 
      ) as IPagination,
    }));;
  }
  async getAiringSchedule(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/airing-schedule", {
      notYetAired: true,
      ...params,
    });
  }

  async getUpcomingAnimes(params = {}) {
    return (
      await axios.get("https://api.jikan.moe/v4/top/anime", {
        params: {
          filter: "upcoming",
        },
      })
    ).data;
  }
}

export const animeApi = new AnimeApi();
