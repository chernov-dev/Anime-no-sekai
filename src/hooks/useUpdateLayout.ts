import { useMutation } from "@tanstack/react-query";
import { useUserPreferences } from "../context/UserPreferencesProvider";
import supabase from "../supabase/supabase-js";

const updateLayout = async (user_id: string, layout) => {
  const { data, error } = await supabase
    .from("users")
    .update({ layout: layout })
    .eq("id", user_id);

  return data;
};

export default function useUpdateLayout() {
  const { layout, setLayout } = useUserPreferences();
  const targetLayout = layout === "grid" ? "fullwidth" : "grid";

  const user = supabase.auth.user();
  return useMutation(["ans-layout"], () =>
    updateLayout(user.id, targetLayout).then(() => setLayout(targetLayout))
  );
}
