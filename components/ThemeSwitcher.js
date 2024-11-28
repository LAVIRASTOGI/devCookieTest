"use client";
import { useTheme } from "@/contexts/ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost m-1 rounded-2xl hover:bg-base-200 transition-colors duration-200"
      >
        {theme === "dark" ? (
          <FaMoon className="w-5 h-5 text-orange-500" />
        ) : (
          <FaSun className="w-5 h-5 text-orange-500" />
        )}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-40"
      >
        <li>
          <button
            onClick={() => changeTheme("dark")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-base-200 transition-colors duration-200 
              ${theme === "dark" ? "bg-base-200" : ""}`}
          >
            <FaMoon className="w-4 h-4 text-orange-500" />
            <span>Dark</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => changeTheme("light")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-base-200 transition-colors duration-200
              ${theme === "light" ? "bg-base-200" : ""}`}
          >
            <FaSun className="w-4 h-4 text-orange-500" />
            <span>Light</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
