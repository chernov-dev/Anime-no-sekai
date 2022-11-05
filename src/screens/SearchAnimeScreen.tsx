import { useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { animeApi } from '../api/Anime_API';
import AnimeGridLayoutView from '../components/AnimeComponents/AnimeHome/AnimeGridLayout/AnimeGridLayoutView';
import TopTrendingList from '../components/AnimeComponents/AnimeTopTrending/TopTrendingList';

const SearchAnimeScreen = ({ animeName }) => {

  const { data, isLoading, status } = useQuery(
    ["anime-search", animeName],
    () => animeApi.advancedSearch({ query: animeName })
  );
  if (status == "success" && data.length == 0) {
    return (
      <Error
        //@ts-expect-error
        statusCode={"404"}
        title={`Anime - "${animeName}" couldn't be found`}
      />
    );
  }

  return (
    <>
      <div className="anime-home">
        <div className="anime-home__container">
          <div className="anime-home__header">
            <p className="text-lg md:text-xl section-heading section-heading my-4">Search - {animeName}</p>
          </div>
          <AnimeGridLayoutView anime={data} />
        </div>
        <aside className="anime-home__sidebar">
          <TopTrendingList />
        </aside>
      </div>
    </>
  )
}

export default SearchAnimeScreen