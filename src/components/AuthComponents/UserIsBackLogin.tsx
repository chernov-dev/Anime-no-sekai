import Link from "next/link";
import React from "react";
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
  return (
    <>
      <div className="auth-header flex flex-col items-center gap-1 text-2xl">
        Welcome back {user.username ?? ""}
        <p className="text-base opacity-75">Continue where you left off</p>
      </div>
      <form
        onSubmitCapture={() => onSubmit()}
        className="auth-inputs flex flex-col gap-4 rounded-[1rem]"
      >
        <input
          type="password"
          name="password"
          id=""
          placeholder="Your password here"
          className="neumorphic-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href={"/forgot"} className="text-sm float-left pl-3 underline opacity-70">
            Forgot password?
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            className="neumorphic-btn secondary"
            type="button"
            onClick={() => {
              setEmail(user.email);
              setTimeout(() => {
                onSubmit();
              }, 0)
            }}
          >
            Log in
          </button>
        )}
      </form>
      <button onClick={onWrongUserButtonClick}>
        <a className="text-sm text-center underline opacity-70">Not {user.username}?</a>
      </button>
    </>
  );
};

export default UserIsBackLogin;
