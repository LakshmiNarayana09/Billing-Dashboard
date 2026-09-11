import {
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({
  onMenuClick,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16
        items-center justify-between
        border-b
        border-gray-200
        bg-white/95
        px-4
        backdrop-blur
        dark:border-gray-800
        dark:bg-gray-900/95
        sm:px-6
      "
    >
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="
            rounded-lg
            p-2
            text-gray-600
            hover:bg-gray-100
            dark:text-gray-300
            dark:hover:bg-gray-800
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="
            text-lg
            font-semibold
            text-gray-800
            dark:text-white
          ">
            Billing Dashboard
          </h2>

          <p className="
            hidden
            text-xs
            text-gray-500
            dark:text-gray-400
            sm:block
          ">
            Manage your billing and subscription
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="
            rounded-xl
            border
            border-gray-200
            p-2.5
            text-gray-600
            transition
            hover:bg-gray-100
            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
          title={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon size={19} />
          ) : (
            <Sun size={19} />
          )}
        </button>

        <div className="
          flex h-9 w-9
          items-center justify-center
          rounded-full
          bg-indigo-600
          text-sm
          font-semibold
          text-white
        ">
          PP
        </div>
      </div>
    </header>
  );
}

export default Navbar;