import { useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import React from 'react'
import { getAnimesByName } from '../api/Anime_API/getAnimesByName';
import AnimeHome from '../components/AnimeComponents/AnimeHome';

const SearchAnimeScreen = ({animeName}) => {

  const { data , isLoading, status } = useQuery(
    ["anime-search", animeName],
    () => getAnimesByName(animeName)
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
    <><AnimeHome anime={data} title={`${animeName.toString().toUpperCase()} - Search`}/></>
  )
}

export default SearchAnimeScreen