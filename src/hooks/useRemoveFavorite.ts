import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
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

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default function useRemoveFavorite(animeId: any) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  let refetchTimeout = 5000;

  return useMutation({
    mutationFn: () => removeFavorite(animeId, user?.id),
    onSuccess: () => {
      toast.promise(
        queryClient.refetchQueries({ queryKey: ["ans-favoriteIds"] }),
        {
          pending: "Removing anime from Favorites",
          success: "Removed from Favorites",
          error: "Error occured",
        },
        { toastId: animeId }
      );
      const updateSoon = async () => {
        await sleep(refetchTimeout);
        queryClient.refetchQueries({ queryKey: ["ans-favorites"] });
      };
      toast.promise(
        updateSoon,
        {
          pending: "Updating Favorite list",
          success: "Favorite list has been updates",
          error: "Error occured",
        },
        { toastId: updateSoon.name, type: "info"}
      );
    }
  });
}
