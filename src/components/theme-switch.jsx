import { useState, useEffect } from "react";
import classNames from "classnames";

const checkDarkMode = () => {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

export default (props) => {
  const [isDarkMode, setIsDarkMode] = useState(checkDarkMode());

  const loadTheme = () => {
    const isDarkBefore = checkDarkMode();
    if (isDarkBefore) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(isDarkBefore);
  };

  const toggleDarkMode = () => {
    if (checkDarkMode()) {
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = "dark";
    }
    loadTheme();
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center inline-block",
        props.className
      )}
    >
      <div className="flex justify-center items-center">
        <span className="">
          <svg
            className={classNames(
              "h-6 w-6",
              isDarkMode ? "text-amber-200" : "text-amber-500"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
        <div
          className={classNames(
            "w-10 h-5.5 flex items-center rounded-full mx-2 px-1 transition cursor-pointer shadow",
            isDarkMode ? "bg-indigo-500" : "bg-gray-300"
          )}
          onClick={toggleDarkMode}
        >
          <div
            className={classNames(
              "bg-white w-4 h-4 rounded-full shadow-lg transform transition",
              { "translate-x-4": isDarkMode }
            )}
          ></div>
        </div>
        <span className="">
          <svg
            className={classNames(
              "h-6 w-6",
              isDarkMode ? "text-gray-800" : "text-gray-400"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
