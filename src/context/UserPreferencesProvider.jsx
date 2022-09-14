import React from "react";
import useLocalStorage from "../utils/useLocalStorage";

const UserPreferencesContext = React.createContext({ animes, prefs });

const UserPreferencesProvider = ({ children }) => {
  const [favourite, setFavourite] = useLocalStorage("ans-favourite", []);
  const [email, setEmail] = useLocalStorage("ans-email", undefined);
  const [colorMode, setColorMode] = useLocalStorage("ans-mode", "dark");

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

export { UserPreferencesProvider, UserPreferencesContext };
