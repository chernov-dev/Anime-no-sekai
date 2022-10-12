import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";

const removeFavorite = async (animeId: any, userId: string) => {
  const { data: foundAnimeId, error } = await supabase
    .from("users.favorites")
    .select("anime_id")
    .eq("user_id", userId)
    .match({ anime_id: animeId })
    .single();

  const exists = foundAnimeId === animeId;

  const { data, error: err } = await supabase
    .from("users.favorites")
    .delete()
    .match({ anime_id: animeId, user_id: userId });

  if (err) {
    throw err;
  }

  return data;
};

export default function useRemoveFavorite(animeId: any) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
   
  return useMutation(() => removeFavorite(animeId, user?.id), {onSuccess: () => {
    queryClient.refetchQueries(['ans-favorites'])
  }});
}
