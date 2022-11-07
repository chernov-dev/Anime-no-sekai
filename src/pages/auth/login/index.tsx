import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewUserLogin from "../../../components/AuthComponents/NewUserLogin";
import UserIsBackLogin from "../../../components/AuthComponents/UserIsBackLogin";
import AuthLayout from "../../../components/Shared/AuthLayout";
import { useUserPreferences } from "../../../context/UserPreferencesProvider";
import useLogin from "../../../hooks/useLogin";

const LoginPage = () => {
  let router = useRouter();

  const { user, setUser } = useUserPreferences();

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

  const onSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  }

  if (loginMutation.isSuccess) {
    router.replace('/profile', undefined, { shallow: true })
  }

  const handleWrongUserButtonClick = () => {
    setUser(null);
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
        {user ? (
          <UserIsBackLogin
            user={user}
            onWrongUserButtonClick={handleWrongUserButtonClick}
            setPassword={setPassword}
            setEmail={setEmail}
            isLoading={loginMutation.isLoading}
            onSubmit={onSubmit}
          />
        ) : (
          <NewUserLogin
            setEmail={setEmail}
            setPassword={setPassword}
            isLoading={loginMutation.isLoading}
            onSubmit={onSubmit}
          />
        )}
      </AuthLayout>
    </>
  );
};

export default LoginPage;
