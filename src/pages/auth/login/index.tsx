import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewUserLogin from "../../../components/AuthComponents/NewUserLogin";
import UserIsBackLogin from "../../../components/AuthComponents/UserIsBackLogin";
import AuthLayout from "../../../components/Shared/AuthLayout";
import useLogin from "../../../hooks/useLogin";
import usePersistState from "../../../utils/usePersistState";

const LoginPage = () => {
  let router = useRouter();

  const [cachedUser, setCachedUser] = usePersistState("ans-user__cached", null);

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //Making sure local storage is available
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  const loginMutation = useLogin({ email, password });

  if (loginMutation.isSuccess) {
    location.href = "/home";
    localStorage.removeItem("ans-user__cached");
  }

  const handleWrongUserButtonClick = () => {
    setCachedUser(null);
  };

  const err = loginMutation.error;

  return (
    <>
      <Head>
        <title>ANS - Login</title>
        <meta name="description " content={`ANS - Login page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout error={err instanceof Error && err.message}>
        {cachedUser ? (
          <UserIsBackLogin
            user={cachedUser}
            onWrongUserButtonClick={handleWrongUserButtonClick}
            setPassword={setPassword}
            setEmail={setEmail}
            isLoading={loginMutation.isLoading}
            onSubmit={loginMutation.mutate}
          />
        ) : (
          <NewUserLogin
            setEmail={setEmail}
            setPassword={setPassword}
            isLoading={loginMutation.isLoading}
            onSubmit={loginMutation.mutate}
          />
        )}
      </AuthLayout>
    </>
  );
};

export default LoginPage;
