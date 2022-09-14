import "../styles/Anime.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/pagination.css";
import "../styles/globals.css";

import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/layout/Header";
import UserPreferencesProvider from "../contexts/userPreferencesProvider";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <UserPreferencesProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <Component {...pageProps} />
          <ReactQueryDevtools position="bottom-left" />
        </Hydrate>
      </QueryClientProvider>
    </UserPreferencesProvider>
  );
}

export default MyApp;
