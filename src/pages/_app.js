import "../styles/Anime.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/globals.css";
import "../styles/Neumorphic.css";

import "react-loading-skeleton/dist/skeleton.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import HeaderComponent from "../components/Navigation/HeaderComponent";
import UserPreferencesProvider from "../context/UserPreferencesProvider";

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
          <SkeletonTheme
            baseColor="var(--neumorph-primary-dark)"
            highlightColor="var(--neumorph-primary-light)"
            duration={3}
          >
            <HeaderComponent />
            <Component {...pageProps} />
          </SkeletonTheme>
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
