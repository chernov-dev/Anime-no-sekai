import Error from "next/error";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import AnimeList from "../../components/AnimeComponents/AnimeList";
import JikaiList from "../../components/AnimeComponents/JikaiList";
import ShareOptions from "../../components/Social/ShareOptions";
import ShareOptionsContainer from "../../components/Social/ShareOptionsContainer";
import { UserPreferencesContext } from "../../context/UserPreferencesProvider";

const UserFavouriteAnimePage = () => {
  const preferences = useContext(UserPreferencesContext);
  const { favourite, setFavourite } = preferences.animes;
  const [error, setError] = useState(false);

  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    if (favourite) {
      setAnimes(favourite);
      setError(() => (animes.length == 0 ? true : false));
    }
  }, [animes.length, favourite]);

  const helperText = (
    <div className="text-white flex flex-wrap items-center justify-center gap-2">
      <b>No anime found</b>, add them by touching
      <BsHeartFill color="red" />
      icon on bottom right of the anime card
      <div className="p-2 bg-white rounded bg-opacity-20 flex gap-2">
        <ShareOptionsContainer />
      </div>
    </div>
  );

  if (error) {
    return (
      <main className="no-data">
        <p className="title">Your favourite animes</p>
        <div className="mx-5 p-5 md:p-10 lg:p-12 rounded text-base sm:text-lg lg:text-xl bg-primary bg-opacity-60">
          {helperText}
        </div>
      </main>
    );
  }


  return (
    <>
      <Head>
        <title>ANS - Favourite animes</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="section-header">
          <h1 className="title">Your favourite animes</h1>
        </div>
        <JikaiList animeArray={animes} />
      </main>
    </>
  );
};

export default UserFavouriteAnimePage;
