import { useMutation } from "@tanstack/react-query";
import { useUserPreferences } from "../context/UserPreferencesProvider";
import supabase from "../supabase/supabase-js";

const updateTheme = async (user_id: string, theme: "dark" | "light") => {
  const { data, error } = await supabase
    .from("users")
    .update({ theme: theme })
    .eq("id", user_id);

  return data;
};

export default function useUpdateTheme() {
  const { theme, setTheme } = useUserPreferences();
  const targetTheme = theme === "dark" ? "light" : "dark";

  const user = supabase.auth.user();
  return useMutation({
    mutationFn: () => updateTheme(user.id, targetTheme).then(() => setTheme(targetTheme))
  });
}
