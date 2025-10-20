import "../styles/Anime.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/Neumorphic.css";

import "../styles/globals.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import AppLayout from "../components/Shared/AppLayout";
import UserPreferencesProvider from "../context/UserPreferencesProvider";

import { Miss_Fajardose, Noto_Sans_JP, Rubik } from "next/font/google";

//Importing fonts using NEXT JS font feature
const rubik = Rubik({ subsets: ["latin"] });
const missFajadose = Miss_Fajardose({ weight: "400" });
const notoSansJP = Noto_Sans_JP({ subsets: ["japanese"], weight: "500" });

const fontFamily = ` html {
  font-family: ${notoSansJP.style.fontFamily},
    ${rubik.style.fontFamily},
    ${missFajadose.style.fontFamily};
}`;

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
            {/* Injecting fonts to head globally*/}
            <style jsx global>
              {fontFamily}
            </style>
            {typeof window !== "undefined" && (
              <>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </>
            )}
          </SkeletonTheme>
          <ReactQueryDevtools position="top-left" />
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
