import { useQuery } from '@tanstack/react-query'
import supabase from '../supabase/supabase-js'

const getUser = async (userId) => {
  const {data} = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single()

  if(data.error) {
    throw new Error(data.error.message)
  }

  if(!data) {
    throw new Error("User not found")
  }

  return data
}

export default function useUser() {
  const user = supabase.auth.user()
  return useQuery(['ans-user'], () => getUser(user?.id))
}