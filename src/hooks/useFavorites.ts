import { getAnimeInfoById } from '../api/Anime_API/getAnimeInfoById';
import { useQueries, useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";
import { getAnimeSearchById } from '../api/Anime_API/getAnimeSearchById';

const fetchFavorites = async (user_id) => {
  const { data, error } = await supabase
    .from("users.favorites")
    .select(`anime_id`)
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }
  const userFavoriteListId = data.map((item) => item.anime_id)
  
  const userFavorites = await fetchUserFavoriteAnime(userFavoriteListId);

  return userFavorites;
};

const fetchUserFavoriteAnime = async (idList: any[]) => {
    const favorites = Promise.all(idList.map((id: number) => {
        return getAnimeInfoById(id)
    }))
    return favorites
}

export default function useFavorites() {
    const user = supabase.auth.user();
    const favorites = useQuery(["ans-favorites", user?.id], () => fetchFavorites(user?.id))
    return favorites;
}
