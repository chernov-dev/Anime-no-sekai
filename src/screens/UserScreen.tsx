import { useEffect, useState } from "react";
import AnimeFavoriteList from "../components/AnimeComponents/AnimeFavorite/AnimeFavoriteList";
import AnimeWeeklyNotificationsComponent from "../components/AnimeComponents/AnimeNotifications/AnimeWeeklyNotificationsComponent";
import UserProfileInfoComponent from "../components/UserComponents/UserProfileInfoComponent";
import useFavorites from "../hooks/useFavorites";
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

  const { data: favorite, isLoading, isSuccess } = useFavorites();
  const [ongoing, setOngoing] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  useEffect(() => {
    // setRecommended(recommendedBasedOnfavorite(favorite, 10));
    if (isSuccess) {
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
    }
  }, [favorite, isSuccess]);

  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className="anime-home">
        <div className="anime-home__container">
          <AnimeFavoriteList
            anime={favorite}
            ongoing={ongoing}
            completed={completed}
          />
        </div>
        <aside className="anime-home__sidebar flex flex-col gap-4 p-3">
          <UserProfileInfoComponent favoritesQuantity={favorite?.length} />
          <AnimeWeeklyNotificationsComponent
            enabled={enabled}
            setEnabled={setEnabled}
            ongoingNumber={ongoing?.length}
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
