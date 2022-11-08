import { useQuery } from '@tanstack/react-query'
import supabase from '../supabase/supabase-js'
import { IUserType } from '../types/User'

export const getUser = async (userId) => {

  if(!userId) {
    throw new Error("Not logged in")
  }

  const {data} = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single()


  if(data.error) {
    throw new Error(data.error)
  }

  if(!data) {
    throw new Error("User not found")
  }

  return data
}

export default function useUser() {
  const user = supabase.auth.user();
  return useQuery<IUserType>(['ans-user'], () => getUser(user.id))
}