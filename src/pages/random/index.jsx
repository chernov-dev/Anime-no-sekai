import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getAnimeByName } from "../../api/getAnimeByName";
import { getRandomAnime } from "../../api/getRandomAnime";
import AnimeDetails from "../../components/AnimeComponents/AnimeDetails";
import reloadIcon from "../../../public/reload-6x-white.png";

const RandomPage = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery(
    ["random-anime"],
    () => getRandomAnime(),
    { refetchOnWindowFocus: false }
  );

  const handleRedirect = () => {
    if (data.id != undefined) {
      router.push(`/anime/${data.id}`);
    }
  };

  if (isLoading) return <main className="text-center">Loading...</main>;

  if (isError) return <div>{error.message}</div>;

  return (
    <main>
      <div className="animeList" onClick={handleRedirect}>
        <AnimeDetails animeInfo={data} />
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => {
            location.reload();
          }}
          type="button"
          className="inline-flex items-center justify-center w-auto px-3 py-2 space-x-2 text-sm font-medium text-white transition bg-gray-700 border border-gray-700 rounded appearance-none cursor-pointer select-none hover:border-gray-600 hover:bg-gray-600 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:pointer-events-none disabled:opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <span>Refresh</span>
        </button>
      </div>
    </main>
  );
};

export default RandomPage;
