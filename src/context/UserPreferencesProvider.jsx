import React, { useEffect, useState, useContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";

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

export const UserPreferencesContext = React.createContext({});

const UserPreferencesProvider = ({ initialTheme, children }) => {
  // User preferences states
  const [favorite, setFavorite] = useLocalStorage("ans-favorite", []);
  const [user, setUser] = useLocalStorage("ans-user__cached");
  const [layout, setLayout] = useLocalStorage("ans-layout", "grid");
  const [theme, setTheme] = useState(getInitialTheme);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (user) {
  //     const preferences = { email, favorite, layout, theme };
  //     updateUserPreferences(user.uid, preferences);
  //   }
  // }, [email, favorite, layout, theme, user]);

  const rawSetTheme = (theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("ans-theme", theme);
    setLoading(false);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  // Helper function to load data from Firebase
  // collRef: collection reference defined above
  // stateValue: state variable set above (series, books, or sections)
  // setStateFunction: setter function defined above

  useEffect(() => {
    setLoading(true);

    rawSetTheme(theme);
  }, [theme]);

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
