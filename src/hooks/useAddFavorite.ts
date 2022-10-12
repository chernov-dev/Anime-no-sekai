import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";

const addFavorite = async (animeId: string, userId: string) => {

  const { data, error } = await supabase
    .from("users.favorites")
    .upsert({ user_id: userId, anime_id: animeId }, { onConflict: "anime_id" })
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export default function useAddFavorite(anime_id: string) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(() => addFavorite(anime_id, user?.id),{onSuccess: () => {
    queryClient.refetchQueries(['ans-favorites'])
  }});
}
