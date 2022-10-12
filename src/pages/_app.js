import "../styles/Anime.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/pagination.css";
import "../styles/Neumorphic.css";
import "../styles/Header.css";
import "../styles/globals.css";

import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserPreferencesProvider from "../context/UserPreferencesProvider";
import Header from "../components/Layout/Navigation/Header";
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserPreferencesProvider>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools position="bottom-left" />
        </UserPreferencesProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
