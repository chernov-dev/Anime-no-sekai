import React, { useContext, useEffect, useState } from "react";
import PageLoader from "../components/Shared/PageLoader";
import useFavoriteIds from "../hooks/useFavoriteIds";
import useUser from "../hooks/useUser";
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
  favoriteIds: number[];
  setFavoriteIds: React.Dispatch<React.SetStateAction<[]>>;
  user: IUserType;
  setUser: React.Dispatch<React.SetStateAction<IUserType>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
};

const UserPreferencesContext =
  React.createContext<IUserPreferencesContextType | undefined>(undefined);

const UserPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const userFavoriteIds = useFavoriteIds();
  const userFetched = useUser();

  const [isLoading, setIsLoading] = useState(true);
  // Caching User preferences states
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [user, setUser] = useState<IUserType | undefined>(undefined);
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
      if (userFavoriteIds.isSuccess) {
        let ids = userFavoriteIds.data;
        setFavoriteIds(ids);
      }
    }
    setIsLoading(false);
  }, [
    userFetched.data,
    userFetched.isSuccess,
    userFavoriteIds.isSuccess,
    userFavoriteIds.data,
    setLayout,
    setTheme,
  ]);

  return (
    <>
      {!isLoading && <UserPreferencesContext.Provider
        value={{
          favoriteIds,
          setFavoriteIds,
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
      </UserPreferencesContext.Provider>}
    </>
  )
};
export default UserPreferencesProvider;

export function useUserPreferences() {
  const userPreferences = useContext(UserPreferencesContext);
  if (!userPreferences)
    throw new Error(
      'No UserPrerferences.Provider found when calling useUserPreferences.'
    );
  return userPreferences;
}
