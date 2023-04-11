import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        &copy; {new Date().getFullYear()} <span>Light/Dark mode app</span>
      </div>
    </footer>
  );
};

export default Footer;
