import React, { useContext, useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import AnimeFavoriteList from "../components/AnimeComponents/AnimeFavoriteList";
import AnimeWeeklyNotificationsComponent from "../components/AnimeComponents/AnimeWeeklyNotificationsComponent";
import PageLoader from "../components/Shared/PageLoader";
import ShareOptionsContainer from "../components/Shared/ShareOptionsContainer";
import UserProfileInfoComponent from "../components/UserComponents/UserProfileInfoComponent";
import {
  UserPreferencesContext,
  useUserPreferences,
} from "../context/UserPreferencesProvider";
import useUser from "../hooks/useUser";
import { IAnimeInfo } from "../types/Anime";

function recommendedBasedOnfavorite(favoriteList: IAnimeInfo[], quantity) {
  let recommendedBasedOnfavorite = [];

  for (let i = 0; i < favoriteList.length; i++) {
    let recommendations = favoriteList[i].recommendations;
    let randomRecommendation = Math.floor(
      Math.random() * favoriteList[i].recommendations.length
    );
    let recommended = recommendations[randomRecommendation];
    if (!recommendedBasedOnfavorite.includes(recommended)) {
      recommendedBasedOnfavorite.push(recommended);
    } else {
      --i;
    }
  }
  return recommendedBasedOnfavorite;
}

const UserScreen = () => {
  const [recommended, setRecommended] = useState([]);

  const { favorite, user } = useUserPreferences();
  const [isLoading, setIsLoading] = useState(true);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    // setRecommended(recommendedBasedOnfavorite(favorite, 10));
    setOngoing((prev) =>
      favorite.filter((anime) => {
        if (anime.status) return anime.status == "Ongoing";
      })
    );
    setCompleted((prev) =>
      favorite.filter((anime) => {
        if (anime.status) return anime.status == "Completed";
      })
    );

    if (favorite && user) setIsLoading(false);
  }, [favorite, user]);

  const [enabled, setEnabled] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center">
        {favorite && (
          <AnimeFavoriteList
          anime={favorite}
          ongoing={ongoing}
          completed={completed}
          />
          )}
        <aside className="flex w-full md:w-[35%] lg:w-[40%] flex-col gap-4 p-3">
          <UserProfileInfoComponent favorites={favorite} user={user} />
          <AnimeWeeklyNotificationsComponent
            enabled={enabled}
            setEnabled={setEnabled}
            ongoingNumber={ongoing.length}
          />
        </aside>
        {/* {recommended.length > 0 && (
              <AnimeRecommendedList anime={recommended}/>
            )} */}
      </div>
    </>
  );
};

export default UserScreen;
