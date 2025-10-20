import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import supabase from "../supabase/supabase-js";

const login = async ({ email, password }) => {
  const data = await supabase.auth.signIn({
    email,
    password,
  });

  if (data.error) {
    throw new Error(data.error.message);
  }


  return data;
};

export default function useLogin({ email, password }) {
  let router = useRouter();
  return useMutation({
    mutationFn: () => login({ email, password }),
    onSuccess: () => {
      router.replace("/home");
    }
  });
}
