import AnimeGridLayoutView from "../AnimeHome/AnimeGridLayout/AnimeGridLayoutView";

const AnimeRecommendations = ({ recommendations }) => {
  return (
    <section className="anime-home__container">
      <div className="anime-home__header">
        <h1 className="section-heading">You might also like these anime</h1>
      </div>
      <AnimeGridLayoutView anime={recommendations} />
    </section>
  );
};


export default AnimeRecommendations;
