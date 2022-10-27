import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnsSvgLogo from "../../../../public/AnsSvgLogo";
import NewUserLogin from "../../../components/AuthComponents/NewUserLogin";
import UserIsBackLogin from "../../../components/AuthComponents/UserIsBackLogin";
import Spinner from "../../../components/Shared/Spinner";
import useLogin from "../../../hooks/useLogin";
import UserLoginScreen from "../../../screens/UserLoginScreen";
import usePersistState from "../../../utils/usePersistState";


const LoginPage = () => {
  

  return (
    <>
      <Head>
        <title>ANS - Login</title>
        <meta name="description " content={`ANS - Login page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col place-content-center">
      <UserLoginScreen/>
      </main>
    </>
  );
};

export default LoginPage;
