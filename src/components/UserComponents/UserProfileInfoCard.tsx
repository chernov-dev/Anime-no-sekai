import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import Spinner from "../Shared/Spinner";

const UserProfileInfoCard = () => {
  const { data: user } = useUser();

  if (!user) return <Spinner></Spinner>;

  return (
    <div className="flex flex-col justify-between gap-2 px-3 py-2 w-full bg-neumorph-primary shadow-neumorphic rounded-xl ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10">
      <h1 className="text-base md:text-xl text-primary">User Profile</h1>
      <div>
        <p className="text-primary text-sm text-opacity-70">
          Username:{" "}
          <span className="text-primary text-sm">
            {user.username ?? <Skeleton width="10rem" />}
          </span>
        </p>
        <p className="text-primary text-sm text-opacity-70">
          Email:{" "}
          <span className="text-primary text-sm">
            {user.email ?? <Skeleton width="10rem" />}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfoCard;
