import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import AnimeFavoriteList from "../../components/AnimeComponents/AnimeFavoriteList";
import AnimeRecommendedList from "../../components/AnimeComponents/AnimeRecommendedList";
import AnimeWeeklyNotificationsComponent from "../../components/AnimeComponents/AnimeWeeklyNotificationsComponent";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import PageLoader from "../../components/Shared/PageLoader";
import ShareOptionsContainer from "../../components/Shared/ShareOptionsContainer";
import UserProfileInfoComponent from "../../components/UserComponents/UserProfileInfoComponent";
import useFavorites from "../../hooks/useFavorites";
import useUser from "../../hooks/useUser";
import { IAnimeInfo } from "../../types/Anime";

function recommendedBasedOnFavorites(favoriteList: IAnimeInfo[], quantity) {
  let recommendedBasedOnFavorites = [];

  for (let i = 0; i < favoriteList.length; i++) {
    let recommendations = favoriteList[i].recommendations;
    let randomRecommendation = Math.floor(
      Math.random() * favoriteList[i].recommendations.length
    );
    let recommended = recommendations[randomRecommendation];
    if (!recommendedBasedOnFavorites.includes(recommended)) {
      recommendedBasedOnFavorites.push(recommended);
    } else {
      --i;
    }
  }
  return recommendedBasedOnFavorites;
}

const UserFavouriteAnimePage = () => {
  const [recommended, setRecommended] = useState([]);

  const { data: favorites, isError, isSuccess, isLoading } = useFavorites();
  const user = useUser();
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setRecommended(recommendedBasedOnFavorites(favorites, 10));

      setOngoing((prev) =>
        favorites.filter((anime) => {
          if (anime.status) return anime.status == "Ongoing";
        })
      );
      setCompleted((prev) =>
        favorites.filter((anime) => {
          if (anime.status) return anime.status == "Completed";
        })
      );
    }
  }, [favorites, isSuccess]);

  const [enabled, setEnabled] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  if ((isSuccess && !favorites.length) || isError) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <b>No anime found</b>, add them by touching
        <BsHeartFill color={"var(--neumorph-accent)"} />
        icon on bottom right of the anime card
        <div className="p-2 rounded bg-opacity-20 flex gap-2">
          <ShareOptionsContainer />
        </div>
      </div>
    );
  }
  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Favourite anime</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        {isSuccess && (
          <>
            <div className="flex flex-col lg:flex-row w-full justify-center">
              <AnimeFavoriteList
                anime={favorites}
                ongoing={ongoing}
                completed={completed}
              />
              <div className="p-5 w-full lg:w-[20%] xl:w-[30%] flex flex-col gap-4">
                <UserProfileInfoComponent favorites={favorites} user={user} />
                <AnimeWeeklyNotificationsComponent
                  enabled={enabled}
                  setEnabled={setEnabled}
                  ongoingNumber={ongoing.length}
                />
                {recommended.length > 0 && (
                  <AnimeRecommendedList anime={recommended}/>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </ProtectedWrapper>
  );
};

export default UserFavouriteAnimePage;
