import { getAnimeInfoById } from "../api/Anime_API/getAnimeInfoById";
import { useQueries, useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";
import { getAnimeSearchById } from "../api/Anime_API/getAnimeSearchById";
import { animeApi } from "../api/Anime_API";

const fetchFavorites = async (user_id) => {
  if (!user_id) {
    throw new Error("Not logged in");
  }

  const { data, error } = await supabase
    .from("users.favorites")
    .select(`anime_id`)
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }
  const userFavoriteListId = data.map((item) => item.anime_id);

  const userFavoriteList = await fetchUserFavoriteAnime(userFavoriteListId);

  //reversing an array to show in user's order
  let filteredItems = [...userFavoriteList].reverse();
  return filteredItems;
};

const fetchUserFavoriteAnime = async (idList: any[]) => {
  const favorites = Promise.all(
    idList.map((id: number) => {
      return getAnimeInfoById(id);
    })
  );

  return favorites;
};

export default function useFavorites() {
  const user = supabase.auth.user() ?? null;
  const favorites = useQuery(["ans-favorites", user?.id], () =>
    fetchFavorites(user?.id)
  );
  return favorites;
}
