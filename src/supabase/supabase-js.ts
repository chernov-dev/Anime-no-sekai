import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey) as SupabaseClient & {
  auth: SupabaseClient['auth'] & {
    user: () => any;
  };
};

// Add compatibility method for Supabase v1 API
// This is a synchronous method that returns the cached user
// Note: This may return null if the session hasn't been loaded yet
let cachedUser: any = null;

// Initialize the cached user
if (typeof window !== 'undefined') {
  supabase.auth.getSession().then(({ data: { session } }) => {
    cachedUser = session?.user ?? null;
  });

  // Keep the cached user updated
  supabase.auth.onAuthStateChange((_event, session) => {
    cachedUser = session?.user ?? null;
  });
}

// Add the v1-compatible user() method
(supabase.auth as any).user = () => cachedUser;

export default supabase;
