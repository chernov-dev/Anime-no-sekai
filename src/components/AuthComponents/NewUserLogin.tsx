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
      <div className="auth-header flex flex-col items-center gap-1 text-2xl">
        Welcome
        <p className="text-base opacity-75">Lets get started</p>
      </div>
      <form
        className="auth-inputs flex flex-col gap-4 rounded-[1rem]"
      >
        <input
          type="email"
          name="email"
          placeholder="Your email here"
          className="neumorphic-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Your password here"
          className="neumorphic-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href={"/forgot"}>
          <a className="text-sm float-left pl-3 underline opacity-70">Forgot password?</a>
        </Link>
        {isLoading ? <Spinner/> : <button className="neumorphic-btn secondary" type="button" onClick={() => onSubmit()}>Log in</button>}
      </form>
      <Link href={"/signup"}>
        <a className="text-sm text-center underline opacity-70">Sign up</a>
      </Link>
    </>
  );
};

export default NewUserLogin;
