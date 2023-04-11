import { useState } from "react";
import { ThemeContext } from "./contexts/theme-context";

import Index from "./layout";
import ImageBg from "./components/ImageBg";

import "./assets/style/main.css";

function App() {
  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light";

    document.documentElement.setAttribute(
      "data-theme",
      localStorageTheme || browserDefault
    );
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme} `}>
        <div className="app">
          <ImageBg />
          <Index />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
