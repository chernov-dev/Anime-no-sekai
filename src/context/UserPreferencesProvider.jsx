import React, { useEffect } from "react";
import useLocalStorage from "../utils/useLocalStorage";

export const UserPreferencesContext = React.createContext({
  animes: {},
  prefs: {},
});

const UserPreferencesProvider = ({ children }) => {
  const [favourite, setFavourite] = useLocalStorage("ans-favourite", []);
  const [email, setEmail] = useLocalStorage("ans-email", null);

  // useEffect(() => {
  //   const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  //   if (prefersDarkScheme.matches) {
  //     setColorMode("dark");
  //   }
  // });

  const [colorMode, setColorMode] = useLocalStorage("ans-mode", "white");

  return (
    <UserPreferencesContext.Provider
      value={{
        animes: { favourite, setFavourite },
        prefs: { email, setEmail, colorMode, setColorMode },
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
