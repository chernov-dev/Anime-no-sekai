import { useState } from "react";
import AnimeHeroSwiper from "../components/AnimeComponents/AnimeHero/AnimeHeroSwiper";
import AnimeHome from "../components/AnimeComponents/AnimeHome/AnimeHome";
import AnimeSchedule from "../components/AnimeComponents/AnimeSchedule/AnimeSchedule";
import { IAnimeTypeFilter } from "../types/Anime";

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [filterType, setFilterType] = useState({} as IAnimeTypeFilter);


  const paginate = (pageNumber: number) => {
    return setCurrentPage(pageNumber);
  };

  return (
    <>
      <AnimeHeroSwiper />

      <AnimeHome
        title="Recently added"
        currentPage={currentPage}
        paginate={paginate}
      >
        <AnimeSchedule />
      </AnimeHome>
    </>
  );
};

export default HomeScreen;
