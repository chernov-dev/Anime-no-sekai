import { toast } from 'react-toastify';
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";

const removeFavorite = async (animeId: any, userId: string) => {
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
  let refetchTimeout = 5000;
  
  return useMutation(() => removeFavorite(animeId, user?.id), {onSuccess: () => {
    toast.promise(queryClient.refetchQueries(['ans-favoriteIds']),{pending: "Removing anime from Favorites" , success: "Removed from Favorites", error: "Error occured"}, {toastId: animeId});
    let updateSoon = setTimeout(() => {
      queryClient.refetchQueries(["ans-favorites"])
      console.log("Refetching")
    }, refetchTimeout);
  }});
}
