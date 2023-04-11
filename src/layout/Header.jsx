import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/theme-context";

import sun from "../assets/images/icon-sun.svg";
import moon from "../assets/images/icon-moon.svg";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";

    setToggle(!toggle);
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("default-theme", isCurrentDark ? "light" : "dark");
  };

  return (
    <div className="header">
      <h1>Todo</h1>
      <button
        onClick={handleThemeChange}
        className="btn btn--transparent click"
      >
        <img src={toggle ? sun : moon} alt={toggle ? "sun" : "moon"} />
      </button>
    </div>
  );
};

export default Header;
