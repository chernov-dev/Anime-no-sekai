import { useMutation } from '@tanstack/react-query'
import supabase from '../supabase/supabase-js'

const login = async ({email, password}) => {
  const data = await supabase.auth.signIn({
    email, 
    password
  })

  if(data.error) {
    throw new Error(data.error.message)
  }

  return data
}

export default function useLogin({ email, password }) {
  return useMutation(['ans-login'], () => login({email, password}))
}