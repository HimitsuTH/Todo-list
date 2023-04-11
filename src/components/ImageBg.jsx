import React, { useContext } from "react";
import bg_dark from "../assets/images/bg-desktop-dark.jpg";
import bg_light from "../assets/images/bg-desktop-light.jpg";

import { ThemeContext } from "../contexts/theme-context";

const ImageBg = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="bg-header">
      <img
        src={theme == "dark" ? bg_dark : bg_light}
        className="bg"
        alt="image"
      />
    </div>
  );
};

export default ImageBg;
