import Link from "next/link";
import React, { useEffect } from "react";
import { IUserType } from "../../types/User";
import Spinner from "../Shared/Spinner";

const UserIsBackLogin = ({
  user,
  onWrongUserButtonClick,
  setEmail,
  setPassword,
  isLoading,
  onSubmit,
}: {
  user: IUserType;
  onWrongUserButtonClick: () => void;
  isLoading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: any;
}) => {

  useEffect(() => {
    setEmail(user?.email);
  }, []);

  return (
    <>
      <div className="auth-header flex flex-col items-center gap-1 text-3xl">
        Welcome back, {user.username ?? ""}
        <p className="text-xl text-primary opacity-75">
          Continue where you left off
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="auth-inputs flex flex-col gap-4 rounded-[1rem] "
      >
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          className="neumorphic-input text-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link
          href={"/forgot"}
          className="text-base float-left pl-3 underline opacity-70"
        >
          Forgot password?
        </Link>
        {isLoading ? (
          <span className="w-full text-center"> <Spinner /></span>
        ) : (
          <button
            className="neumorphic-btn secondary w-1/2 self-center mt-4 text-lg"
            type="submit"
          >
            Log in
          </button>
        )}
      </form>
      <button onClick={onWrongUserButtonClick}>
        <a className="text-base text-center underline opacity-70">
          Not {user.username}?
        </a>
      </button>
    </>
  );
};

export default UserIsBackLogin;
