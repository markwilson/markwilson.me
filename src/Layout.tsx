import { FC, ReactNode, useEffect, useState } from "react";
import "./Layout.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    !!(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  );

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (darkMode !== !!event.matches) {
          setDarkMode(!darkMode);
        }
      });
  }, [setDarkMode, darkMode]);

  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

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
