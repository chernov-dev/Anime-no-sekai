import "../styles/AnimePreview.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/pagination.css";
import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { SearchInput } from "../components/Inputs/SearchInput";
import backgroundImage from "../public/background.svg";

import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="header-spacer"></div>
      <div className="page-container">
        <Header />
        <div className="w-full border-b border-gray-400 border-opacity-10 py-5 px-7">
          <SearchInput />
        </div>
        <NextNProgress
          color="#bdb7ab"
          startPosition={0.3}
          stopDelayMs={200}
          height={10}
          showOnShallow={true}
        />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
