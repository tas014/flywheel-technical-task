"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Dark from "../UI/Icons/Dark";
import Light from "../UI/Icons/Light";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 p-2 rounded-lg bg-(--button-color) opacity-50" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
        theme === "dark" ? "text-amber-600" : "text-amber-300"
      } hover:bg-(--button-color)/30 transition-colors cursor-pointer`}
      title="Toggle dark mode"
    >
      {theme === "dark" ? <Dark /> : <Light />}
      <span className="text-base text-(--text-secondary)"> Switch theme</span>
    </button>
  );
}
