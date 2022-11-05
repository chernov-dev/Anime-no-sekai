import "../styles/Anime.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/Neumorphic.css";

import "../styles/globals.css";

import "react-loading-skeleton/dist/skeleton.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import AppLayout from "../components/Shared/AppLayout";
import AppNavigation from "../components/Shared/AppNavigation";
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

const isReady = typeof window !== "undefined";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserPreferencesProvider>
          <SkeletonTheme
            baseColor="rgb(var(--neumorph-primary-dark))"
            highlightColor="rgb(var(--neumorph-primary-light))"
            duration={3}
          >
            {typeof window !== "undefined" && (
              <>
                <AppNavigation />
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </>
            )}
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
