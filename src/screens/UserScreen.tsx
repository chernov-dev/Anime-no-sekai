import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import AnimeFavoriteList from "../components/AnimeComponents/AnimeFavoriteList";
import AnimeWeeklyNotificationsComponent from "../components/AnimeComponents/AnimeWeeklyNotificationsComponent";
import PageLoader from "../components/Shared/PageLoader";
import ShareOptionsContainer from "../components/Shared/ShareOptionsContainer";
import UserProfileInfoComponent from "../components/UserComponents/UserProfileInfoComponent";
import useFavorites from "../hooks/useFavorites";
import useUser from "../hooks/useUser";
import { IAnimeInfo } from "../types/Anime";

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

const UserScreen = () => {
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
    <>
      {isSuccess && (
        <>
          <div className="flex flex-col md:flex-row justify-center">
            <AnimeFavoriteList
              anime={favorites}
              ongoing={ongoing}
              completed={completed}
            />
            <aside className="flex w-full md:w-[35%] lg:w-[40%] flex-col gap-4 p-3">
              <UserProfileInfoComponent favorites={favorites} user={user} />
              <AnimeWeeklyNotificationsComponent
                enabled={enabled}
                setEnabled={setEnabled}
                ongoingNumber={ongoing.length}
              />
              {/* {recommended.length > 0 && (
              <AnimeRecommendedList anime={recommended}/>
            )} */}
            </aside>
          </div>
        </>
      )}
    </>
  );
};

export default UserScreen;
