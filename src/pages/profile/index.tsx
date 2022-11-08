import Head from "next/head";
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
      <UserScreen />
    </ProtectedWrapper>
  );
};

export default UserFavouriteAnimePage;
