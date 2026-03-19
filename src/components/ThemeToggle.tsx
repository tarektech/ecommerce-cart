"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "aqavia-theme";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : document.documentElement.classList.contains("dark")
          ? "dark"
          : getSystemTheme();

    applyTheme(initialTheme);
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label={
        mounted ? `Switch to ${nextTheme} theme` : "Toggle color theme"
      }
      className="rounded-full"
      onClick={() => {
        const updatedTheme = theme === "dark" ? "light" : "dark";

        applyTheme(updatedTheme);
        setTheme(updatedTheme);
      }}
      size="icon"
      title={mounted ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
      type="button"
      variant="outline"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
