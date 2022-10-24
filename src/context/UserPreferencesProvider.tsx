import React, { useEffect, useState, useContext } from "react";
import PageLoader from "../components/Shared/PageLoader";
import Spinner from "../components/Shared/Spinner";
import useFavorites from "../hooks/useFavorites";
import useUser from "../hooks/useUser";
import { IAnimeResult } from "../types/Anime";
import { IUserType } from "../types/User";
import usePersistState from "../utils/usePersistState";

export function getInitialTheme() {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("ans-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
}

export type IUserPreferencesContextType = {
  favorite: Array<IAnimeResult>;
  setFavorite: React.Dispatch<React.SetStateAction<IAnimeResult[]>>;
  user: IUserType;
  setUser: React.Dispatch<React.SetStateAction<IUserType>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
};

export const UserPreferencesContext =
  React.createContext<IUserPreferencesContextType>(null);

const UserPreferencesProvider = ({ initialTheme, children }) => {
  const userFavorites = useFavorites();
  const userFetched = useUser();

  const [isLoading, setIsLoading] = useState(true);
  // Caching User preferences states
  const [favorite, setFavorite] = useState<IAnimeResult[]>([]);
  const [user, setUser] = useState<IUserType>(null);
  const [layout, setLayout] = usePersistState("ans-layout", "grid");
  const [theme, setTheme] = usePersistState("ans-theme", getInitialTheme());

  useEffect(() => {
    if (typeof window !== undefined) {
      const root = window.document.documentElement;
      const isDark = theme === "dark";

      root.classList.remove(isDark ? "light" : "dark");
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (userFetched.isSuccess) {
      let { layout, theme, ...user } = userFetched.data;
      setLayout(layout);
      setUser(user as IUserType);
      setTheme(theme);
      if (userFavorites.isSuccess) {
        let favorites = userFavorites.data;
        setFavorite(favorites);
      }
    }
    setIsLoading(false);
  }, [
    userFetched.data,
    userFetched.isSuccess,
    userFavorites.isSuccess,
    userFavorites.data,
    setLayout,
    setTheme,
    userFavorites.isError,
  ]);

  return (
    <UserPreferencesContext.Provider
      value={{
        favorite,
        setFavorite,
        user,
        setUser,
        theme,
        setTheme,
        layout,
        setLayout,
      }}
    >
      {isLoading && <PageLoader />}
      {!isLoading && children}
    </UserPreferencesContext.Provider>
  );
};
export default UserPreferencesProvider;

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}
