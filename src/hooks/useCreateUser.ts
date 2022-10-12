import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase-js";

interface User {
  email: string;
  username: string;
  password: string;
}

const createUser = async (user: User) => {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from("users")
    .select("*")
    .eq("username", user.username)
    .single();

  if (userWithUsername) {
    throw new Error("User with username exists");
  }

  const data = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (data.error) {
    throw data.error.message;
  }
  return data;
};

export default function useCreateUser(user: User) {
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          email: user.email,
          username: user.username,
          id: data.user.id,
        });

      if (insertError) {
        throw insertError.message;
      }

      return insertData;
    },
  });
}
