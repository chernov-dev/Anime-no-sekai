import Link from "next/link";
import React from "react";
import Spinner from "../Shared/Spinner";

const UserIsBackLogin = ({
  name,
  onWrongUserButtonClick,
  setPassword,
  isLoading,
  onSubmit,
}: {
  name?: string;
  onWrongUserButtonClick: () => void;
  isLoading: boolean;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: any;
}) => {
  return (
    <>
      <div className="auth-header flex flex-col items-center gap-1 text-2xl">
        Welcome back {name ?? ""}
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
        <Link href={"/forgot"}>
          <a className="text-sm float-left pl-3 underline opacity-70">Forgot password?</a>
        </Link>
        {isLoading ? <Spinner/> : <button className="neumorphic-btn secondary" type="button" onClick={() => onSubmit()}>Log in</button>}
      </form>
      <button onClick={onWrongUserButtonClick}>
        <a className="text-sm text-center underline opacity-70">Not {name}?</a>
      </button>
    </>
  );
};

export default UserIsBackLogin;
