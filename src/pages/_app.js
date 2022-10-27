import "../styles/Anime.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/Neumorphic.css";
import "../styles/globals.css";

import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HeaderComponent from "../components/Navigation/HeaderComponent";
import UserPreferencesProvider from "../context/UserPreferencesProvider";
import { ToastContainer } from "react-toastify";

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
          <HeaderComponent />
          <Component {...pageProps} />
          <ReactQueryDevtools position="bottom-left" />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            toastClassName={"neumorphic-toast"}
            theme="colored"
            hideProgressBar={true}
            closeButton={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </UserPreferencesProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
