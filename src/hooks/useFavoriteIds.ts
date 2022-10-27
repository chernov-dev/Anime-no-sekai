import { getAnimeInfoById } from "../api/Anime_API/getAnimeInfoById";
import { useQueries, useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";
import { getAnimeSearchById } from "../api/Anime_API/getAnimeSearchById";
import { animeApi } from "../api/Anime_API";

const fetchFavoriteIds = async (user_id) => {
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
  return userFavoriteListId;
};

export default function useFavoriteIds() {
  const user = supabase.auth.user() ?? null;
  const favorites = useQuery(["ans-favoriteIds", user?.id], () =>
    fetchFavoriteIds(user?.id)
  );
  return favorites;
}
