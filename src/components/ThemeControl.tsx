import { useEffect, useState } from "react";

const ThemeControl = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkClass = window &&
      (window.localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches));
    setDarkMode(isDarkClass);

    if (isDarkClass) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  const toggleTheme = () => {
    const isDarkClass = !darkMode;
    setDarkMode(isDarkClass);
    window.localStorage.setItem("color-theme", isDarkClass ? "dark" : "light");
    if (isDarkClass) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="ml-4">
      <button onClick={toggleTheme} className="w-4 h-4" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
        <i className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'} text-xl p-1 border rounded-lg w-10 h-10 text-slate-700 bg-white hover:bg-gray-100 active:bg-gray-200 dark:text-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600`}></i>
      </button>
    </div>
  )
}

export default ThemeControl;