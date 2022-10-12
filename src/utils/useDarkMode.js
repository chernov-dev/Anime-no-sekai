import { useEffect } from "react";
import { useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(
    typeof window != "undefined" && window.localStorage.theme
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;
