import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import AnsSvgLogo from "../../../../public/AnsSvgLogo";
import UserSignUp from "../../../components/AuthComponents/UserSignUp";
import Spinner from "../../../components/Shared/Spinner";
import useCreateUser from "../../../hooks/useCreateUser";
import UserSignUpScreen from "../../../screens/UserSignUpScreen";

const SignupPage = () => {
 

  return (
    <>
      <Head>
        <title>ANS - Signup</title>
        <meta name="description " content={`ANS - Signup page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col place-content-center">
        <UserSignUpScreen/>
      </main>
    </>
  );
};

export default SignupPage;
