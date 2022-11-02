import { useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { animeApi } from '../api/Anime_API';
import AnimeGridLayoutView from '../components/AnimeComponents/AnimeHome/AnimeGridLayout/AnimeGridLayoutView';

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
      <div className='flex flex-col'>
        <h1>{`${animeName?.toString().toUpperCase()} - Search`}</h1>
        <AnimeGridLayoutView anime={data} />
      </div>
    </>
  )
}

export default SearchAnimeScreen