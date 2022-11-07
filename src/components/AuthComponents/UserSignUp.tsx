import Link from "next/link";

const UserSignUp = ({ handleSubmit, setEmail, setPassword, setUsername }) => {
  return (
    <>
      <div className="auth-header flex flex-col items-center gap-1 text-3xl">
        Welcome
        <p className="text-xl opacity-75">Lets save your data</p>
      </div>
      <form
        className="auth-inputs flex flex-col gap-2 rounded-[1rem]"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="neumorphic-input text-lg"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="neumorphic-input text-lg"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="neumorphic-input text-lg"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="neumorphic-btn secondary w-1/2 self-center mt-4 text-lg" type="submit" onClick={() => handleSubmit()}>
          Sign up
        </button>
      </form>
      <Link href={"/auth/login"} className="text-base text-center underline opacity-70">
        Already have an account?
      </Link>
    </>
  );
};

export default UserSignUp;
