import Link from "next/link";

const UserSignUp = ({ handleSubmit, setEmail, setPassword, setUsername }) => {
  return (
    <>
      <div className="auth-header flex flex-col items-center gap-1 text-2xl">
        Welcome
        <p className="text-base opacity-75">Lets save your data</p>
      </div>
      <form
        className="auth-inputs flex flex-col gap-2 rounded-[1rem]"
      >
        <input
          type="text"
          name="username"
          placeholder="Your username here"
          className="neumorphic-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email here"
          className="neumorphic-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password here"
          className="neumorphic-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="neumorphic-btn secondary w-1/2 self-center mt-4" type="button" onClick={() => handleSubmit()}>
          Sign up
        </button>
      </form>
      <Link href={"/auth/login"} className="text-sm text-center">
        Already have an account?
      </Link>
    </>
  );
};

export default UserSignUp;
