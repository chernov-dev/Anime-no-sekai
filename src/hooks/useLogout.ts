import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import supabase from "../supabase/supabase-js";


const logout = async () => {
  const { error } = await supabase.auth.signOut()
  
  if(error) {
    throw error
  }
}

export default function useLogOut() {
  const queryClient = useQueryClient()
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.removeQueries()
      router.replace("/");
    }
  })
}