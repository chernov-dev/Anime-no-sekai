import React, { useEffect, useState, useContext } from "react";
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
  favorite: Array<IAnimeResult>,
  setFavorite: React.Dispatch<React.SetStateAction<IAnimeResult>>,
  user: IUserType,
  setUser: React.Dispatch<React.SetStateAction<IUserType>>,
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,
  layout: string,
  setLayout: React.Dispatch<React.SetStateAction<string>>,
}

export const UserPreferencesContext = React.createContext<IUserPreferencesContextType>(null);

const UserPreferencesProvider = ({ initialTheme, children }) => {
  const userFavorites = useFavorites();
  const userFetched = useUser();

  // Caching User preferences states
  const [favorite, setFavorite] = usePersistState("ans-favorite", null);
  const [user, setUser] = usePersistState("ans-user__cached", null);
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
    if (userFetched.isSuccess && userFavorites.isSuccess) {
      let { layout, theme, ...user } = userFetched.data;
      let favorites = userFavorites.data;
      setLayout(layout);
      setUser(user);
      setFavorite(favorites);
      setTheme(theme);
    }
  }, [userFetched.data, userFetched.isSuccess, userFavorites.isSuccess, userFavorites.data, setLayout, setUser, setFavorite, setTheme]);

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
      {children}
    </UserPreferencesContext.Provider>
  );
};
export default UserPreferencesProvider;

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}
