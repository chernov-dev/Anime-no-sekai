import React from "react";
import { useUserPreferences } from "../../context/UserPreferencesProvider";
import Spinner from "../Shared/Spinner";

const UserProfileInfoComponent = ({ favorites }) => {

  const {user} = useUserPreferences();

  if(!user) return <Spinner></Spinner>

  return (
    <div className="flex flex-col justify-between gap-2 px-3 py-2 w-full bg-neumorph-primary shadow-neumorphic rounded-xl ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10">
      <h1 className="text-base md:text-xl text-neumorph-secondary">
        User Profile
      </h1>
      <div>
        <p className="text-neumorph-secondary text-base">
          Username:{" "}
          <span className="opacity-60 text-black dark:text-white">
            {user.username}
          </span>
        </p>
        <p className="text-neumorph-secondary text-base">
          Email:{" "}
          <span className="opacity-60 text-black dark:text-white">
            {user.email}
          </span>
        </p>
      </div>
      <p className="text-neumorph-secondary">
        Anime in the list:{" "}
        <span className="text-neumorph-accent">{favorites.length}</span>
      </p>
    </div>
  );
};

export default UserProfileInfoComponent;
