import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import AnsSvgLogo from "../../../../public/AnsSvgLogo";
import UserSignUp from "../../../components/AuthComponents/UserSignUp";
import Spinner from "../../../components/Shared/Spinner";
import useCreateUser from "../../../hooks/useCreateUser";

const SignupPage = () => {
  let router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserMutation = useCreateUser({
    email,
    password,
    username,
  });

  if (createUserMutation.isSuccess) {
    router.push("/home");
  }

  return (
    <>
      <Head>
        <title>ANS - Signup</title>
        <meta name="description " content={`ANS - Signup page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col place-content-center">
        <div className="max-w-[700px] rounded-[1rem] w-full h-full shadow-neumorphic mx-auto text-neumorph-secondary">
          <div className=" flex flex-col items-center h-full gap-3">
            <div className="relative w-full p-2">
              <AnsSvgLogo
                style={{
                  width: "inherit",
                  height: "inherit",
                  borderRadius: "1rem",
                  background: "var(--neumorph-primary)",
                }}
                className="shadow-neumorphic-inner p-2"
                color="black"
              />
            </div>
            <div className="flex flex-col gap-5 p-4 px-8 pt-0 mb-16 max-w-[550px] w-full">
              {createUserMutation.isLoading ? (
                <Spinner/>
              ) : (
                <UserSignUp
                  handleSubmit={createUserMutation.mutate}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setUsername={setUsername}
                />
              )}
            </div>
            {createUserMutation.isError && (
              <p className="text-sm mb-8 text-red-500">
                {//@ts-ignore
                createUserMutation.error.message}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;
