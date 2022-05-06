import "../styles/AnimePreview.css";
import "../styles/AnimeCard.css";
import "../styles/AnimePlayer.css";
import "../styles/pagination.css";
import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { SearchInput } from "../components/Inputs/SearchInput";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="header-spacer"></div>
      <div className="page-container">
        <Header />
        <div className="w-full border-b border-gray-400 border-opacity-10 py-5 px-7">
          <SearchInput />
        </div>
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
