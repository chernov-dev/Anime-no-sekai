import AnimeGridLayoutView from "../AnimeGridLayout/AnimeGridLayoutView";

const AnimeRecommendations = ({ recommendations }) => {
  return (
    <div className="anime-home__container w-[100%]">
      <div className="anime-home__header">
        <h1 className="text-xl md:text-2xl">You might also like these anime</h1>
      </div>
      <AnimeGridLayoutView anime={recommendations} epStatus={false}/>
    </div>
  );
};


export default AnimeRecommendations;
