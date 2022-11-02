import AnimeGridLayoutView from "../AnimeHome/AnimeGridLayout/AnimeGridLayoutView";

const AnimeRecommendations = ({ recommendations }) => {
  return (
    <div className="anime-home__container">
      <div className="anime-home__header">
        <h1 className="text-xl md:text-2xl">You might also like these anime</h1>
      </div>
      <AnimeGridLayoutView anime={recommendations} />
    </div>
  );
};


export default AnimeRecommendations;
