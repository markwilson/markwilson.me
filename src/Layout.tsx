import { FC, ReactNode, useEffect, useState } from "react";
import "./Layout.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    !!(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  );

  // on the off chance they change the color scheme setting, have an event listener for it
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (darkMode !== !!event.matches) {
          setDarkMode(!darkMode);
        }
      });
  }, [setDarkMode, darkMode]);

  // always add/remove the dark class on each render - this stops the transition states running after the initial render
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  // cleanup the body class - this is to make sure the light mode background doesn't flicker on a slower load
  useEffect(() => {
    document.body.classList.remove("app-not-loaded");
  }, []);

  return (
    <>
      <div className="fixed-bottom-right">
        <button
          className="theme-switch"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          <img
            src={`/${darkMode ? "light" : "dark"}.png`}
            alt={`Switch to ${darkMode ? "light" : "dark"} mode`}
          />
        </button>
      </div>

      {children}
    </>
  );
};

export default Layout;
