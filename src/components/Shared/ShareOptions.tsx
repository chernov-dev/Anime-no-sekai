import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useAddFavorite from "../../hooks/useAddFavorite";
import useFavoriteIds from "../../hooks/useFavoriteIds";
import useRemoveFavorite from "../../hooks/useRemoveFavorite";
import ShareOptionsContainer from "./ShareOptionsContainer";

const ShareOptions = ({ anime }) => {
  const removeFavorite = useRemoveFavorite(anime.id);
  const addFavorite = useAddFavorite(anime.id);

  const { data: favoriteIds } = useFavoriteIds();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favoriteIds?.some((e) => e == anime.id));
  }, [anime.id, favoriteIds]);

  const onHeartClick = (e) => {
    e.stopPropagation();
    if (liked) {
      removeFavorite.mutate();
    } else {
      addFavorite.mutate();
    }
  };

  return <ShareOptionsContainer liked={liked} onHeartClick={onHeartClick} />;
};

export default ShareOptions;
