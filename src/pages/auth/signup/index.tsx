import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import UserSignUp from "../../../components/AuthComponents/UserSignUp";
import AuthLayout from "../../../components/Shared/AuthLayout";
import Spinner from "../../../components/Shared/Spinner";
import useCreateUser from "../../../hooks/useCreateUser";

const SignupPage = ({ }) => {

  let router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserMutation = useCreateUser({
    email,
    password,
    username,
  });

  const onSubmit = (e) => {
    e.preventDefault()
    createUserMutation.mutate()
  }

  if (createUserMutation.isSuccess) {
    router.push("/home");
  }

  const err = createUserMutation.error;

  return (
    <>
      <Head>
        <title>ANS - Signup</title>
        <meta name="description " content={`ANS - Signup page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout error={err instanceof Error && err.message}>
        {createUserMutation.isLoading ? (
          <Spinner />
        ) : (
          <UserSignUp
            handleSubmit={onSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        )}
      </AuthLayout>
    </>
  );
};

export default SignupPage;
