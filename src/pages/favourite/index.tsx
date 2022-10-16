import Head from "next/head";
import React from "react";
import ProtectedWrapper from "../../components/AuthComponents/Protected";

import UserScreen from "../../screens/UserScreen";


const UserFavouriteAnimePage = () => {
  
  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Favourite anime</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <UserScreen/>
      </main>
    </ProtectedWrapper>
  );
};

export default UserFavouriteAnimePage;
