import Link from "next/link";
import React from "react";
import Spinner from "../Shared/Spinner";

const NewUserLogin = ({
  setPassword,
  setEmail,
  onSubmit,
  isLoading,
}: {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: any;
  isLoading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="auth-header flex flex-col items-center gap-1 text-3xl">
        Welcome
        <p className="text-xl text-primary text-opacity-75">Lets get started</p>
      </div>
      <form className="auth-inputs flex flex-col gap-4 rounded-[1rem]">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="neumorphic-input text-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
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
          <Spinner />
        ) : (
          <button
            className="neumorphic-btn secondary w-1/2 self-center mt-4 text-lg"
            type="button"
            onClick={() => onSubmit()}
          >
            Log in
          </button>
        )}
      </form>
      <Link
        href={"/auth/signup"}
        className="text-base text-center underline opacity-70"
      >
        Sign up{" "}
      </Link>
    </>
  );
};

export default NewUserLogin;
