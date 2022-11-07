import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";


const logout = async () => {
  const { error } = await supabase.auth.signOut()
  
  if(error) {
    throw error
  }
}

export default function useLogOut() {
  const queryClient = useQueryClient()
  
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    }
  })
}