import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AnsSvgLogo from '../../public/AnsSvgLogo';
import NewUserLogin from '../components/AuthComponents/NewUserLogin';
import UserIsBackLogin from '../components/AuthComponents/UserIsBackLogin';
import Spinner from '../components/Shared/Spinner';
import useLogin from '../hooks/useLogin';
import usePersistState from '../utils/usePersistState';

const UserLoginScreen = () => {

  let router = useRouter();

  const [cachedUser, setCachedUser] = usePersistState("ans-user__cached", null);

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //Making sure local storage is available
    if (typeof window !== "undefined") {
      setLoading(false)
    }
  }, [])

  const loginMutation = useLogin({ email, password });

  if (loginMutation.isSuccess) {
    location.href = ("/home");
    localStorage.removeItem("ans-user__cached")
  }

  const handleWrongUserButtonClick = () => {
    setCachedUser(null);
  };

  return (
    <div className="max-w-[700px] rounded-[1rem] w-full h-full shadow-neumorphic mx-auto text-primary">
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
        {loading && <div className="my-2 text-center"><Spinner /></div>}
        {!loading && <div className="flex flex-col gap-5 p-4 px-8 pt-0 mx-8 max-w-[550px] w-full">
          {cachedUser && (
            <UserIsBackLogin
              user={cachedUser}
              setEmail={setEmail}
              onWrongUserButtonClick={handleWrongUserButtonClick}
              setPassword={setPassword}
              isLoading={loginMutation.isLoading}
              onSubmit={loginMutation.mutate}
            />
          )}
          {!cachedUser && (
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
        </div>}
        {loginMutation.isError && (
          <p className="text-sm mb-8 text-red-500">
            {//@ts-ignore
              loginMutation.error.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default UserLoginScreen