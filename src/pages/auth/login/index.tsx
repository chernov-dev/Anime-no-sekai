import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AnsSvgLogo from "../../../../public/AnsSvgLogo";
import NewUserLogin from "../../../components/AuthComponents/NewUserLogin";
import UserIsBackLogin from "../../../components/AuthComponents/UserIsBackLogin";
import { UserPreferencesContext } from "../../../context/UserPreferencesProvider";
import GoogleButton from "react-google-button";
import GoogleNeumorphismButton from "../../../components/NeumUI/Button/GoogleNeumorphismButton";
import NeumorphismButton from "../../../components/NeumUI/Button/NeumorphismButton";
import { FaUserTimes } from "react-icons/fa";
import useLogin from "../../../hooks/useLogin";

const LoginPage = () => {
  let router = useRouter();
  const context = useContext(UserPreferencesContext);
  const { email: prefEmail, setEmail: setPrefEmail }: any = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin({ email, password });

  if (loginMutation.isSuccess) {
    router.push("/home");
  }

  const handleWrongUserButtonClick = () => {
    setPrefEmail(null);
  };

  return (
    <>
      <Head>
        <title>ANS - Login</title>
        <meta name="description " content={`ANS - Login page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col place-content-center">
        <div className="max-w-[700px] rounded-[1rem] w-full h-full shadow-neumorphic mx-auto text-neumorph-secondary">
          <div className=" flex flex-col items-center h-full gap-3">
            <div className="relative w-full h-full p-2">
              <AnsSvgLogo
                style={{
                  width: "inherit",
                  height: "inherit",
                  background: "var(--neumorph-primary)",
                }}
                className="shadow-neumorphic-inner p-5 rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[3rem] rounded-br-[3rem]"
                color="black"
              />
            </div>
            <div className="flex flex-col gap-5 p-4 px-8 pt-0 mx-8 max-w-[550px] w-full">
              {prefEmail && (
                <UserIsBackLogin
                  name={`${prefEmail.split("@")[0]}`}
                  onWrongUserButtonClick={handleWrongUserButtonClick}
                  setPassword={setPassword}
                  isLoading={loginMutation.isLoading}
                  onSubmit={loginMutation.mutate}
                />
              )}
              {!prefEmail && (
                <NewUserLogin
                  setEmail={setEmail}
                  setPassword={setPassword}
                  isLoading={loginMutation.isLoading}
                  onSubmit={loginMutation.mutate}
                />
              )}
              {/* <GoogleNeumorphismButton
                onClick={handleGoogleSignIn}
                className="self-center"
              /> */}
              {/* <NeumorphismButton
                onClick={() => loginMutation.mutate()}
                className="self-center"
              >
                <FaUserTimes size={22} />
                <p>Sign in anonymously</p>
              </NeumorphismButton> */}
            </div>
            {loginMutation.isError && (
              <p className="text-sm mb-8 text-red-500">
                {//@ts-ignore
                loginMutation.error.message}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
